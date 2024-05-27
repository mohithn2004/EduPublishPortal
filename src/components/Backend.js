const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));


const db = mysql.createConnection({
  host: "localhost",
  user: "mohithn2004",
  password: "1234",
  database: "recordsmaintain",
});



db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
  fetchTableColumns();
});

let tableColumns = {};

function fetchTableColumns() {
  db.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Error retrieving table names:", err);
      return;
    }
    const tables = results.map((row) => Object.values(row)[0]);
    const filteredTables = tables.filter((table) => table !== "users");
    filteredTables.forEach((table) => {
      db.query(`DESCRIBE ${table}`, (err, columns) => {
        if (err) {
          console.error(`Error retrieving columns for table ${table}:`, err);
        } else {
          tableColumns[table] = columns.map((row) => row.Field);
          console.log(`Columns for table ${table}:`, tableColumns[table]);
        }
      });
    });
  });
}



app.post("/userprofile", (req, res) => {
  const userEmail = req.body.email;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [userEmail],
    (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ user: results[0] });
      }
    }
  );
});



app.post("/user/publications", (req, res) => {
  const userEmail = req.body.email;

  const query = `
    SELECT 
      (SELECT COUNT(*) FROM conference c, users u WHERE c.eid = u.eid AND u.email = ?) AS conferenceCount,
      (SELECT COUNT(*) FROM journal j, users u WHERE j.eid = u.eid AND u.email = ?) AS journalCount,
      (SELECT COUNT(*) FROM bookchapter b, users u WHERE b.eid = u.eid AND u.email = ?) AS bookChapterCount,
      (SELECT COUNT(*) FROM textbook t, users u WHERE t.eid = u.eid AND u.email = ?) AS textbookCount,
      (SELECT Name FROM users where email=?) AS name
  `;

  db.query(
    query,
    [userEmail, userEmail, userEmail, userEmail, userEmail],
    (error, results) => {
      if (error) {
        console.error("Error fetching publication counts:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(200).json(results[0]);
    }
  );
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        res.status(200).json({ message: "Login successful", user: results[0] });
      }
    }
  );
});



app.post("/conference", async (req, res) => {
  const formData = req.body;
  const userEmail = req.body.email;
  db.query(
    "SELECT name, eid FROM users WHERE email = ?",
    userEmail,
    (error, results) => {
      if (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const { name, eid } = results[0];
      formData.Name = name;
      formData.eid = eid;

      db.query("INSERT INTO Conference SET ?", formData, (error) => {
        if (error) {
          console.error("Error inserting into Conference table:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res
          .status(201)
          .json({ message: "Conference entry created successfully" });
      });
    }
  );
});



app.post("/journal", async (req, res) => {
  const formData = req.body;
  const userEmail = req.body.email;
  db.query(
    "SELECT name, eid FROM users WHERE email = ?",
    userEmail,
    (error, results) => {
      if (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const { name, eid } = results[0];
      formData.Name = name;
      formData.eid = eid;

      db.query("INSERT INTO Journal SET ?", formData, (error) => {
        if (error) {
          console.error("Error inserting into Journal table:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res.status(201).json({ message: "Journal entry created successfully" });
      });
    }
  );
});



app.post("/bookchapter", async (req, res) => {
  const formData = req.body;
  const userEmail = req.body.email;
  db.query(
    "SELECT name, eid FROM users WHERE email = ?",
    userEmail,
    (error, results) => {
      if (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const { name, eid } = results[0];
      formData.Name = name;
      formData.eid = eid;

      db.query("INSERT INTO BookChapter SET ?", formData, (error) => {
        if (error) {
          console.error("Error inserting into BookChapter table:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res
          .status(201)
          .json({ message: "BookChapter entry created successfully" });
      });
    }
  );
});



app.post("/textbook", async (req, res) => {
  const formData = req.body;
  const userEmail = req.body.email;
  db.query(
    "SELECT name, eid FROM users WHERE email = ?",
    userEmail,
    (error, results) => {
      if (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const { name, eid } = results[0];
      formData.Name = name;
      formData.eid = eid;

      db.query("INSERT INTO textBook SET ?", formData, (error) => {
        if (error) {
          console.error("Error inserting into textBook table:", error);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res
          .status(201)
          .json({ message: "textBook entry created successfully" });
      });
    }
  );
});



app.get("/search", (req, res) => {
  const searchTerm = req.query.term;

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }

  const searchQuery = `
    SELECT * FROM (
      ${Object.entries(tableColumns)
        .filter(([table, columns]) => table !== "user")
        .map(([table, columns]) => {
          return columns
            .map((column) => {
              return `SELECT '${table}' AS table_name, '${column}' AS column_name, ${column} FROM ${table} WHERE ${column} LIKE '%${searchTerm}%'`;
            })
            .join(" UNION ALL ");
        })
        .join(" UNION ALL ")}
    ) AS search_results;
  `;

  db.query(searchQuery, (err, results) => {
    if (err) {
      console.error("Error executing search query:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while searching" });
    }
    res.json(results);
  });
});



app.get("/fullrowdata", (req, res) => {
  const { tableName, columnName, searchTerm } = req.query;

  if (!tableName || !columnName || !searchTerm) {
    return res
      .status(400)
      .json({ error: "Table name, column name, and search term are required" });
  }

  const fullRowQuery = `SELECT * FROM ${tableName} WHERE ${columnName} LIKE '%${searchTerm}%'`;

  db.query(fullRowQuery, (err, rows) => {
    if (err) {
      console.error("Error fetching full row data:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching full row data" });
    }
    res.json(rows);
  });
});



app.post("/user/allPublications", (req, res) => {
  const userEmail = req.body.email;

  const query = `
    SELECT 'conference' AS type, c.title as title, c.year as year, u.email
    FROM conference c
    JOIN users u ON c.eid = u.eid
    WHERE u.email = ?
    UNION ALL
    SELECT 'journal' AS type, j.title as title, j.monthAndYear as year, u.email
    FROM journal j
    JOIN users u ON j.eid = u.eid
    WHERE u.email = ?
    UNION ALL
    SELECT 'bookchapter' AS type, b.title as title, b.year as year, u.email
    FROM bookchapter b
    JOIN users u ON b.eid = u.eid
    WHERE u.email = ?
    UNION ALL
    SELECT 'textbook' AS type, t.title as title, t.year as year, u.email
    FROM textbook t
    JOIN users u ON t.eid = u.eid
    WHERE u.email = ?
  `;

  db.query(
    query,
    [userEmail, userEmail, userEmail, userEmail],
    (error, results) => {
      if (error) {
        console.error("Error fetching publications:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(200).json(results);
    }
  );
});



app.put("/update/:table/:title", (req, res) => {
  const { table, title } = req.params;
  const updatedData = req.body;

  db.query(
    `UPDATE ${table} SET ? WHERE Title = ?`,
    [updatedData, title],
    (err, results) => {
      if (err) {
        console.error(
          `Error updating publication in ${table} with title ${title}:`,
          err
        );
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Publication not found" });
        return;
      }
      res.status(200).json({ message: "Publication updated successfully" });
    }
  );
});



app.get("/user/publication/:table/:title", (req, res) => {
  const { table, title } = req.params;

  const query = `SELECT * FROM ?? WHERE Title = ?`;
  db.query(query, [table, title], (err, results) => {
    if (err) {
      console.error(
        `Error fetching publication from ${table} with title ${title}:`,
        err
      );
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Publication not found" });
      return;
    }
    res.status(200).json(results[0]);
  });
});



app.delete("/user/publication/delete/:table/:title", (req, res) => {
  const { table, title } = req.params;
  const validTables = ["conference", "journal", "bookchapter", "textbook"];
  if (!validTables.includes(table)) {
    return res.status(400).json({ error: "Invalid table name" });
  }

  const query = `DELETE FROM ?? WHERE title = ?`;
  db.query(query, [table, title], (error, results) => {
    if (error) {
      console.error("Error deleting publication:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json({ message: "Publication deleted successfully" });
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
