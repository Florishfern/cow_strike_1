cow-strike-exam/
├── .env                  # เก็บค่า config เช่น Port
├── package.json
├── server.js             # จุดเริ่มต้นโปรแกรม
├── models/
│   └── cowModel.js       # จัดการข้อมูลวัวและการคำนวณน้ำนม
├── controllers/
│   └── cowController.js  # รับค่าจาก View ส่งให้ Model และตอบกลับ
├── views/
│   ├── index.ejs         # หน้าจอรับรหัส (HTML)
│   └── result.ejs        # หน้าจอแสดงผล (HTML)
└── public/
    └── css/
        └── style.css     # ตกแต่งหน้าจอ