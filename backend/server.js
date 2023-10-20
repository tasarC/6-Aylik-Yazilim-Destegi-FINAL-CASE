import express from "express";
import cors from 'cors';
import session from 'express-session'; // express-session modülünü import edin
import cookieParser from "cookie-parser";
import mysql from 'mysql'


const corsOptions = {
    origin: 'http://localhost:5173', // İzin verilen kök
    Credential: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.use(session({
    secret: 'secret-key', // Oturum verilerini şifrelemek için kullanılır, değiştirmeniz önemlidir
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

const sharedData = {
    user_id: null,
    password: null// Başlangıçta null olarak ayarlanabilir
};

app.post('/signup', function (req, res) {
    const { email, password, password_repeat } = req.body;

    // Veritabanında e-posta adresinin mevcut olup olmadığını kontrol et
    db.query('SELECT * FROM login WHERE email = ?', [email], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Veritabanı hatası' });
        }
        if (rows.length > 0) {
            // E-posta adresi zaten kayıtlı, kayıt işlemini engelle
            return res.status(400).json({ error: 'Bu e-posta adresi zaten kayıtlı' });
        }

        // Eğer e-posta adresi kullanılabilirse, yeni kullanıcıyı veritabanına ekleyin
        const sql = "INSERT INTO login (`email`, `password`, `password_repeat`) VALUES (?)";
        const values = [email, password, password_repeat];

        db.query(sql, [values], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Veritabanı hatası' });
            }
            return res.json(data);
        });
    });
});

app.post('/login', (req, res)=> {
    const sql = "SELECT *FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        if (data.length > 0) {
            req.session.user_id = data[0].id;
            sharedData.user_id = req.session.user_id;
            return res.json({ message: 'Başarılı oturum açma' });
        } else {
            return res.json("Faile");
        }
    })

});



app.get('/', function (req, res) {
    const userId = sharedData.user_id; // Kullanıcının kimliğini oturumdan alın
    console.log(userId, "user_id yok");
    if (userId) {
        const sql = "SELECT login.email ,cars.car_id, cars.car_name, cars.brand, cars.model, cars.year ,cars.plaka FROM login LEFT JOIN cars ON login.id = cars.user_id WHERE login.id =?";
        db.query(sql, [userId], (err, result) => {
            if (err) {
                return res.json({ message: "Veritabanı hatası" });
            }
            // console.log(sql);
            return res.json(result); // Kullanıcının araç verilerini döndürün
        });
    } else {
        return res.json({ message: "Oturum açılmamış kullanıcı" });
    }
});


app.post('/cars', function (req, res) {
    const userId = sharedData.user_id; // Kullanıcının kimliğini oturumdan alın
    console.log(userId, "hello cooo")
    const values = [
        req.body.user_id = userId,
        req.body.car_name,
        req.body.brand,
        req.body.model,
        req.body.year,
        req.body.plaka
    ];
    const sql = "INSERT INTO cars (user_id,car_name,brand,model,year,plaka) VALUES (?)";
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});




app.get('/read/:id', function (req, res) {
    // Kullanıcının kimliğini oturumdan alın

    const id = req.params.id;

    const sql = "SELECT login.email ,cars.car_id, cars.car_name, cars.brand, cars.model, cars.year ,cars.plaka FROM login LEFT JOIN cars ON login.id = cars.user_id WHERE car_id =?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });

});

app.put('/editcars/:id', function (req, res) {
    const values = [
        req.body.car_name,
        req.body.brand,
        req.body.model,
        req.body.year,
        req.body.plaka,
        req.params.id // URL'den alınan ID
    ];

    const sql = 'UPDATE cars SET `car_name` = ?, `brand` = ?, `model` = ?, `year` = ?, `plaka` = ? WHERE car_id = ?';
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Veri güncelleme hatası: ' + err.message);
            return res.status(500).json({ message: 'Veri güncelleme hatası' });
        }
        return res.status(200).json({ message: 'Veri başarıyla güncellendi' });
    });
});

app.delete('/delete/:id',(req,res)=>{
    const sql ='DELETE FROM cars WHERE car_id = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({message:"hata var"});
        return res.json(result);
    });
})


app.post('/login/changepassword', (req, res) => {
    const userId =  sharedData.user_id;// Oturum açmış kullanıcının kimliği
  
    const { oldpassword, newpassword, newpasswordrepeat } = req.body;
  
    // Kullanıcının eski şifresini kontrol et
    db.query('SELECT password, password_repeat FROM login WHERE id = ?', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Veritabanı hatası.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
      }
  
      const savedPassword = results[0].password;
      const savedPasswordRepeat = results[0].password_repeat;
  
      if (oldpassword !== savedPassword) {
        return res.status(400).json({ error: 'Eski şifre yanlış.' });
      }
  
      // Yeni şifrelerin eşleşip eşleşmediğini kontrol et
      if (newpassword !== newpasswordrepeat) {
        return res.status(400).json({ error: 'Yeni şifreler eşleşmiyor.' });
      }
  
      // Yeni şifreyi güncelle
      db.query('UPDATE login SET password = ? WHERE id = ?', [newpassword, userId], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Şifre güncelleme hatası.' });
        }
  
        // Şimdi password_repeat alanını güncelle
        db.query('UPDATE login SET password_repeat = ? WHERE id = ?', [newpasswordrepeat, userId], (err) => {
          if (err) {
            return res.status(500).json({ error: 'password_repeat güncelleme hatası.' });
          }
  
          return res.json({ message: 'Şifre ve password_repeat başarıyla değiştirildi.' });
        });
      });
    });
  });

// Sunucu tarafında kullanıcı hesap kapatma işlemini işleme
// Kullanıcıyı ve ilgili arabaları silme işlemi
app.delete('/deleteUser', (req, res) => {
    const userId = sharedData.user_id; // Kullanıcının kimliği
  
    // İlk olarak, ilgili arabaları silin
    const deleteCarsQuery = 'DELETE FROM cars WHERE user_id = ?';
    db.query(deleteCarsQuery, [userId], (err, carDeleteResult) => {
      if (err) {
        console.error('Araba silme hatası:', err);
        return res.status(500).json({ error: 'Arabaları silme sırasında hata oluştu.' });
      }
  
      // Arabalar başarıyla silindi, şimdi kullanıcıyı silin
      const deleteUserQuery = 'DELETE FROM login WHERE id = ?';
      db.query(deleteUserQuery, [userId], (err, userDeleteResult) => {
        if (err) {
          console.error('Hesap kapatma hatası:', err);
          return res.status(500).json({ error: 'Hesap kapatma sırasında hata oluştu.' });
        }
  
        if (userDeleteResult.affectedRows === 0) {
          return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }
  
        // Kullanıcı ve ilgili arabalar başarıyla silindi
        res.status(200).json({message:'Kullanıcı ve ilgili arabalar başarıyla silindi.'});
      });
    });
  });
  
  
  

app.listen(8081, () => {
    console.log("listening")
})

db.connect((err) => {
    if (err) {
        console.error("Database connection error: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database as ID " + db.threadId);
});

