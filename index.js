const functions = require('./contacts')


// functions.listContacts();
// functions.getContactById('5');
// functions.removeContact('7');
// functions.addContact('Anna Anna', 'email.@gmail.com', '(888) 212-212');

const argv = require('yargs').argv

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await functions.listContacts()
      console.table(contactList)
      break
    case 'get':
      const contact = await functions.getContactById(id)
      console.table(contact)
      break

    case 'add':
      const newContact = await functions.addContact(name, email, phone)
      console.table(newContact)
      break

    case 'remove':
      const removeContact = await functions.removeContact(id)
      console.table(removeContact)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)

// // index.js
// const argv = require('yargs').argv;

// // TODO: рефакторить
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case 'list':
//       console.log('list')
//       break;

//     case 'get':
//        console.log('id',id)
//       break;

//     case 'add':
//      console.log( 'name email phone', name, email, phone)
//       break;

//     case 'remove':
//       console.log('id',id)
//       break;

//     default:
//       console.warn('\x1B[31m Unknown action type!');
//   }
// }

// invokeAction(argv);
