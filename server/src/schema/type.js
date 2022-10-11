const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = require('graphql')
const { Movies, Directors } = require('../model')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve: (parent, args) => {
        return Directors.findById(parent.directorId)
      },
    },
  }),
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => {
        return Movies.find({ directorId: parent.id })
      },
    },
  }),
})

module.exports = {
  MovieType,
  DirectorType,
}
