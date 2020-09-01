const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ApolloError } = require('apollo-server');
const axios = require('axios');

const { createToken } = require('../utils/auth');
const User = require('../schema/userModel');
const Listing = require('../schema/listingModel');

const resolvers = {
  Query: {
    getUsers: async (_, args, ctx) => {
      try {
        const res = await User.find();

        return res;
      } catch (error) {
        console.log(error);
      }
    },

    getListings: async (_, { ownerId, keyword }, ctx) => {
      let res;

      // GET ALL LISTINGS
      if (!ownerId) {
        if (!keyword) {
          res = await Listing.find().populate('owner');
        } else {
          res = await Listing.find({ title: { $regex: keyword, $options: 'i' } }).populate('owner');
        }
      }
      // GET OWNERS LISTINGS
      else {
        res = await Listing.find({ ownerId }).populate('owner');
      }
      return res;
    },
    getListing: async (_, { id }, ctx) => {
      const res = await Listing.findById(id).populate('owner');

      return res;
    },
    refreshToken: async (_, { token }, ctx) => {
      const checkToken = await jwt.verify(token, process.env.JWT_SECRET);

      const { email, username } = checkToken;

      const newToken = await createToken({ email, username });

      return newToken;
    },
    me: async (_, args, ctx) => {
      const { user } = ctx;

      if (!user) throw new AuthenticationError('Please login');
      const res = await User.findOne({ email: user.email });
      const id = res._id;

      return {
        id,
        email: res.email,
        username: res.username,
        userPicture: res.userPicture,
      };
    },
    confirmOrder: async (_, { orderId }, ctx) => {
      const url = `https://api.playground.klarna.com/checkout/v3/orders/${orderId}`;
      try {
        const res = await axios({
          method: 'get',
          headers: {
            'content-type': 'application/json',
          },
          auth: {
            username: process.env.KLARNA_USERNAME,
            password: process.env.KLARNA_PASSWORD,
          },
          url,
        });

        return {
          order_id: res.data.order_id,
          status: res.data.status,
          purchase_country: res.data.purchase_country,
          purchase_currency: res.data.purchase_currency,
          order_amount: res.data.order_amount,
          order_tax_amount: res.data.order_tax_amount,
          html_snippet: res.data.html_snippet,
        };
      } catch (error) {
        console.log('Confirm Order resolver error : ', error);
      }
    },
  },
  Mutation: {
    login: async (_, args, ctx) => {
      const { email, password } = args;

      const res = await User.findOne({ email });

      if (!res) throw new AuthenticationError('Wrong credential');

      const match = await bcrypt.compare(password, res.password);

      if (!match) throw new AuthenticationError('Wrong credential');

      const token = await createToken({ email, username: res.username });

      return token;
    },
    createUser: async (_, args, ctx) => {
      try {
        const { email, password, username } = args;

        const res = await User.findOne({ email });
        const res1 = await User.findOne({ username });

        if (res) throw new ApolloError('This email already exists');
        if (res1) throw new ApolloError('This username already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
          email,
          username,
          password: hashedPassword,
        };

        await User.create(userData);

        const token = await createToken({ email, username });
        return token;
      } catch (error) {
        console.log(error);
      }
    },
    createListing: async (_, { newListing }, ctx) => {
      const { title, price, description, images, owner, ownerId, category } = newListing;

      const createdAt = new Date().toISOString();
      const newListingToAdd = {
        title,
        price,
        description,
        images,
        owner,
        ownerId,
        category,
        createdAt,
      };
      const res = await Listing.create(newListingToAdd);
      return res;
    },
    deleteListing: async (_, { id }, ctx) => {
      const res = await Listing.findById(id);

      if (!res) return 'No listing found';

      await Listing.findByIdAndDelete(id);

      return 'Listing deleted';
    },
    deleteAllListings: async () => {
      try {
        const { deletedCount } = await Listing.deleteMany({});

        return `Successfully deleted ${deletedCount} documents`;
      } catch (error) {
        throw new Error('there was an error');
      }
    },
    checkout: async (_, { order }, ctx) => {
      const TAX_RATE = 0.2;

      const { title, totalPrice } = order;

      const klarnaPrice = totalPrice * 100;
      const klarnaTax = Math.floor(klarnaPrice - (klarnaPrice * 10000) / (10000 + TAX_RATE * 10000));

      const orderMock = {
        purchase_country: 'FR',
        purchase_currency: 'EUR',
        locale: 'en-GB',
        order_amount: klarnaPrice,
        order_tax_amount: klarnaTax,
        order_lines: [
          {
            type: 'physical',
            reference: '19-402-USA',
            name: title,
            quantity: 1,
            quantity_unit: 'pcs',
            unit_price: klarnaPrice,
            tax_rate: TAX_RATE * 10000,
            total_amount: klarnaPrice,
            total_discount_amount: 0,
            total_tax_amount: klarnaTax,
          },
        ],
        merchant_urls: {
          terms: 'https://www.example.com/terms.html',
          checkout: 'https://www.example.com/checkout.html?order_id={checkout.order.id}',
          confirmation: 'https://www.example.com/confirmation.html?order_id={checkout.order.id}',
          push: 'https://www.example.com/api/push?order_id={checkout.order.id}',
        },
      };

      try {
        const res = await axios({
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          auth: {
            username: 'PK27493_e3d7b46d123f',
            password: '3G1F0lWCqULi7CTW',
          },
          url: 'https://api.playground.klarna.com/checkout/v3/orders',
          data: orderMock,
        });

        return {
          order_id: res.data.order_id,
          status: res.data.status,
          purchase_country: res.data.purchase_country,
          purchase_currency: res.data.purchase_currency,
          order_amount: res.data.order_amount,
          order_tax_amount: res.data.order_tax_amount,
          html_snippet: res.data.html_snippet,
        };
      } catch (error) {
        console.log('Error :', error);
      }
    },
  },
};

module.exports = resolvers;
