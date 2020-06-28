export const resolvers = {
  Node: {
    __resolveType(node) {
      console.log('Node __resolveType');
  
      return 'Item';
    }
  },
  
  Query: {
    node: (_parent, args, ctx) => {
      console.log('Query.node')
      return {
        id: 'aaa',
        name: 'Jonathan',
        email: 'jonathan@galdino.dev',
        password: 'jo'
      }
    },
  }  
}