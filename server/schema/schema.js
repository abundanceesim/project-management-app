const {projects, clients } = require('../sampleData')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql')

const Project = require("../models/Project");
const Client = require("../models/Client");


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
            // return clients.find(client => client.id === parent.clientId)
            // find the client whose id matched the project's clientId
            return clients.findById(parent.clientId)
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
                return Project.find()
            }
        },
        project: {
            type: ProjectType, //get client by id
            args: { id: {type: GraphQLID} }, //add the args you'd be passing in with the query
            resolve(parentValue, args){
                // resolve determines what would be returned, as well as args
                return Project.findById(args.id)
            }
        },
        clients: {
            type: GraphQLList(ClientType), //querying a List of clients
            resolve(parent, args){
                return Client.find()
            }
        },
        client: {
            type: ClientType, //get client by id
            args: { id: {type: GraphQLID} }, //add the args you'd be passing in with the query
            resolve(parentValue, args){
                // resolve determines what would be returned, as well as args
                return Client.findById(args.id);
            }
        }
    }
})


// In order to use the query(RootQuery), it has to be exported as a schema.
module.exports = new GraphQLSchema({
    query: RootQuery,
})