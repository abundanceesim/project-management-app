const {projects, clients } = require('../sampleData')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql')

const ClientType = new GraphQLObjectType({
    name: 'Client', 
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: GraphQLList(ClientType), //querying a List of clients
            resolve(parent, args){
                return clients
            }
        },
        client: {
            type: ClientType, //get client by id
            args: { id: {type: GraphQLID} }, //add the args you'd be passing in with the query
            resolve(parentValue, args){
                // resolve determines what would be returned, as well as args
                return clients.find(client => client.id === args.id)
            }
        }
    }
})

// In order to use the query(RootQuery), it has to be exported as a schema.
module.exports = new GraphQLSchema({
    query: RootQuery,
})