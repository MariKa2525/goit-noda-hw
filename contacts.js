const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, './db/contacts.json')

async function listContacts() {
    try {
        const response = await fs.readFile(contactsPath);
        let contacts = JSON.parse(response);
        return contacts;
      } catch (err) {
        console.error(err.message);
      }
}

// function listContacts() {
//     fs.readFile(contactsPath, (err, data) => {
//       if (err) return console.error(err.message)
//       console.table(JSON.parse(data))
//     })
//   }

function getContactById(contactId) {
  fs.readFile(contactId, (err, data) => {
    if (err) return console.error(err.message)
    console.table(JSON.parse(data))
  })
}

function removeContact(contactId) {
  fs.unlink(contactId, function (err) {
    if (err) {
      return console.error(err)
    }
    console.log('Contact deleted successfully!')
  })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err.message)
    }
    const contacts = JSON.parse(data)
    const contactsNew = { id: shortid.generate(), name, email, phone }
    const contactsList = JSON.stringify([contactNew, ...contacts], null, '\t')

    fs.writeFile(contactsPath, contactsList, (err) => {
      if (err) console.error(err)
    })
  })
}
try {
  addContact()
} catch (error) {
  next(error)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
