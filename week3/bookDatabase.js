console.log('I am Zekrom,my IP is 192.168.137.1, Mac address is 70-32-17-D0-6F-6A.NCC student ID is 727')
const sqlite3 = require('sqlite3').verbose();  
const readline = require('readline');  
  
const rl = readline.createInterface({  
  input: process.stdin,  
  output: process.stdout  
});  
  
// Connect to SQLite database, create table if it doesn't exist  
let db = new sqlite3.Database('./books.db', (err) => {  
  if (err) {  
    return console.error(err.message);  
  }  
  console.log('Connected to the in-memory SQLite database.');  
  
  db.serialize(() => {  
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title727 TEXT, author727 TEXT, isbn727 TEXT, context727 TEXT)', (err) => {  
      if (err) {  
        return console.error(err.message);  
      }  
      console.log('Table created successfully.');  
      insertBooks();  
    });  
  });  
});  
  
// Function to insert books into the database  
function insertBooks() {  
  const insertBook = () => {  
    rl.question('Enter book title 727: ', (title727) => {  
      rl.question('Enter book author 727: ', (author727) => {  
        rl.question('Enter book ISBN 727: ', (isbn727) => {  
          rl.question('Enter book context 727: ', (context727) => {  
            db.run('INSERT INTO books (title727, author727, isbn727, context727) VALUES (?, ?, ?, ?)', [title727, author727, isbn727, context727], (err) => {  
              if (err) {  
                return console.error(err.message);  
              }  
              console.log('Book inserted successfully.');  
              rl.prompt();  
              insertMoreBooks();  
            });  
          });  
        });  
      });  
    });  
  };  
  
  // Function to ask user if they want to insert more books  
  function insertMoreBooks() {  
    rl.question('Do you want to insert another book? (yes/no): ', (answer) => {  
      if (answer.toLowerCase() === 'yes') {  
        insertBook();  
      } else {  
        listBooks();  
      }  
    });  
  }  
  
  // Insert the initial 3 records  
  for (let i = 0; i < 3; i++) {  
    insertBook();  
  }  
}  
  
// Function to list all books from the database  
function listBooks() {  
  db.all('SELECT * FROM books', [], (err, rows) => {  
    if (err) {  
      return console.error(err.message);  
    }  
    console.log('All books:');  
    rows.forEach((row) => {  
      console.log(`ID: ${row.id}, Title: ${row.title727}, Author: ${row.author727}, ISBN: ${row.isbn727}, Context: ${row.context727}`);  
    });  
    rl.close();  
  });  
}  
  
// Close the database connection when the readline interface is closed  
rl.on('close', () => {  
  db.close((err) => {  
    if (err) {  
      return console.error(err.message);  
    }  
    console.log('Database connection closed.');  
  });  
});
