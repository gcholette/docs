# Graphql
## Resources
- [Graphql Threat Matrix](https://github.com/nicholasaleks/graphql-threat-matrix)
- [Hacktricks Graphql](https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/graphql#graphql)
- [jondow.eu/practical-graphql-attack-vectors](https://jondow.eu/practical-graphql-attack-vectors/)
- [graphql-common-vulnerabilities-how-to-exploit-them](https://medium.com/@the.bilal.rizwan/graphql-common-vulnerabilities-how-to-exploit-them-464f9fdce696)
- [common-security-test-cases-for-graphql-endpoints](https://medium.com/@apkash8/graphql-vs-rest-api-model-common-security-test-cases-for-graphql-endpoints-5b723b1468b4)
- [ghostlulz.com/api-hacking-graphql](http://ghostlulz.com/api-hacking-graphql/)
- [PayloadAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/GraphQL%20Injection/README.md)
- [Portswigger graphql](https://portswigger.net/web-security/graphql)

## Tools
- [Altair Graphql Client](https://altairgraphql.dev/)
- [Clairvoyance](https://github.com/nikitastupin/clairvoyance)
- [EyeWitness](https://github.com/RedSiege/EyeWitness)
- [CrackQL](https://github.com/nicholasaleks/CrackQL)
- [Graphw00f](https://github.com/dolevf/graphw00f)
- [BatchQL](https://github.com/assetnote/batchql)
- [graphql-path-enum](https://gitlab.com/dee-see/graphql-path-enum)
- [GraphQL Cop](https://github.com/dolevf/graphql-cop)
- [InQL Burp extension](https://github.com/doyensec/inql)


## Recon

### Detecting Graphql

```bash
graphw00f -d -t http://<target_ip_or_domain>:<target_port> --fingerprint
```

### Basic introspection queries
```
query {
  __schema {
    types {
      name
    }
  }
}
```

```
{
 __schema {
   queryType {
     fields {
       name
       type {
         name
       }
     }
    }
   }
}
```

```
query {
  __type(name: "SomeType") {
    name
    kind
    fields {
      name
      type {
          name
          kind
      }
    }
  }
}
```

```
query {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      kind
      name
      fields {
        name
        args {
          name
        }
      }
    }
  }
}
```

```
# source: GraphQL Voyager
 
query IntrospectionQuery {
  __schema {

    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description

      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
```
