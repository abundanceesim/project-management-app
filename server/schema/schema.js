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

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: { //every project has a client.
        type: ClientType,
        resolve(parent, args){
            return clients.find(client => client.id === parent.clientId)
            // find the client whose id matched the project's clientId
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: GraphQLList(ProjectType), //querying a List of projects
            resolve(parent, args){
                return projects
            }
        },
        project: {
            type: ProjectType, //get client by id
            args: { id: {type: GraphQLID} }, //add the args you'd be passing in with the query
            resolve(parentValue, args){
                // resolve determines what would be returned, as well as args
                return projects.find(project => project.id === args.id)
            }
        },
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