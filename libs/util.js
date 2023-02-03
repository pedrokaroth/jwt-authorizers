module.exports.buildIAMPolicy = (userId, effect, resource, context) => {
  console.log(effect)
  return {
    principalId: userId,
    policyDocument: {
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect ? 'Allow' : 'Deny',
        Resource: resource
      }]
    },
    context
  }
}
