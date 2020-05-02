import { gql } from 'apollo-server';

const typeDefs = gql`
  type Server {
    """
    Players nicknames list.
    """
    players: [String!]!
  }

  type Query{
      """
        Server Info  
      """
      server: Server
  }

  type Mutation {
      """
       Give Player by nickname operator status.
      """
      op(nickname: String!): String!
  }
`;

export { typeDefs };
export default typeDefs;