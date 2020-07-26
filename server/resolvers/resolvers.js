const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { createToken } = require("../utils/auth");
const User = require("../schema/userModel");
const Listing = require("../schema/listingModel");

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

    getListings: async () => {
      const res = await Listing.find();

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

      if (!user) throw new AuthenticationError("Please login");

      return {
        email: user.email,
        username: user.username,
      };
    },
  },
  Mutation: {
    login: async (_, args, ctx) => {
      const { email, password } = args;

      const res = await User.findOne({ email });

      if (!res) throw new AuthenticationError("Wrong credential");

      const match = await bcrypt.compare(password, res.password);

      if (!match) throw new AuthenticationError("Wrong credential");

      const token = await createToken({ email, username: res.username });

      return token;
    },
    createUser: async (_, args, ctx) => {
      try {
        const { email, password, username } = args;

        const res = await User.findOne({ email });
        const res1 = await User.findOne({ username });

        if (res) return "This email already exists";
        if (res1) return "This username already exists";

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
  },
};

module.exports = resolvers;
