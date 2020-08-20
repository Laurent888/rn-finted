const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ApolloError } = require('apollo-server');

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
        email: user.email,
        username: user.username,
      };
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
  },
};

module.exports = resolvers;
