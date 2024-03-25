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
    db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, isbn TEXT, context TEXT)', (err) => {  
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
    rl.question('Enter book title: ', (title) => {  
      rl.question('Enter book author: ', (author) => {  
        rl.question('Enter book ISBN: ', (isbn) => {  
          rl.question('Enter book context: ', (context) => {  
            db.run('INSERT INTO books (title, author, isbn, context) VALUES (?, ?, ?, ?)', [title, author, isbn, context], (err) => {  
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
      console.log(`ID: ${row.id}, Title: ${row.title}, Author: ${row.author}, ISBN: ${row.isbn}, Context: ${row.context}`);  
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
