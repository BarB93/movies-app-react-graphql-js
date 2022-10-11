const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql')
const { Movies, Directors } = require('../model')
const { DirectorType, MovieType } = require('./type')

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movies.find({})
      },
    },
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movies.findById(args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Directors.findById(args.id)
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Directors.find({})
      },
    },
  },
})

module.exports = Query
