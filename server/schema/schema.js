const {projects, clients } = require('../sampleData')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLScalarType } = require('graphql')

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
            return Client.findById(parent.clientId)
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

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // Delete client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // return Client.deleteOne({id: args.id});
        return Client.findByIdAndDelete(args.id);
      },
    },
    // Add Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },
    // Delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // return Project.deleteOne(args.id);
        return Project.findByIdAndDelete(args.id);
      },
    },
    // Update project:
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }, //not mandatory
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate", //name has to be unique, can't use "ProjectStatus" again
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

// In order to use the query(RootQuery), it has to be exported as a schema.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})