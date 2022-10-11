const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull } = require('graphql')
const { DirectorType, MovieType } = require('./type')
const { Directors, Movies } = require('../model')

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Director
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Directors.create({ name: args.name, age: args.age })
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Directors.findByIdAndDelete(args.id)
      },
    },
    updateDirectorById: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const update = {
          ...(args.name ? { name: args.name } : {}),
          ...(args.age ? { age: args.age } : {}),
        }

        const options = {
          new: true,
        }

        return Directors.findByIdAndUpdate(args.id, update, options)
      },
    },

    // Movies
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movies.create({ name: args.name, genre: args.genre, directorId: args.directorId })
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movies.findByIdAndDelete(args.id)
      },
    },
    updateMovieById: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const update = {
          ...(args.name ? { name: args.name } : {}),
          ...(args.genre ? { genre: args.genre } : {}),
          ...(args.directorId ? { directorId: args.directorId } : {}),
        }

        const options = {
          new: true,
        }

        return Movies.findByIdAndUpdate(args.id, update, options)
      },
    },
  },
})

module.exports = Mutation
