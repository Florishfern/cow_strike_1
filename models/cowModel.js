const db = require('../config/db'); // เรียกใช้ตัวเชื่อมต่อ DB

class CowModel {
    
    // ฟังก์ชันค้นหาวัวจาก Database (ทำงานเป็น Async)
    static async getCowById(id) {
        try {
            // สมมติชื่อตารางคือ 'cows' และมี column: id, color, age_years, age_months
            const [rows] = await db.execute('SELECT * FROM cows WHERE cow_id = ?', [id]);
            
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Database Error:', error);
            throw error;
        }
    }

    // ฟังก์ชันคำนวณ (Business Logic คงเดิม ไม่ต้องแก้ SQL ในส่วนนี้)
    static calculateMilk(cow) {
        let result = {
            milkType: '',
            amount: 0
        };

        // ตรวจสอบชื่อ Column ให้ตรงกับใน Database ของคุณ 
        // (เช่นใน DB อาจเก็บเป็น age_years แต่ใน object นี้ต้องเรียกให้ถูก)
        const ageYears = cow.age_year; 
        const ageMonths = cow.age_month;
        const color = cow.color;

        if (color === 'white') {
            const totalMonths = (ageYears * 12) + ageMonths;
            result.milkType = 'นมจืด (Plain Milk)';
            result.amount = 120 - totalMonths;
        } else if (color === 'brown') {
            result.milkType = 'นมช็อกโกแลต (Chocolate Milk)';
            result.amount = 40 - ageYears;
        } else if (color === 'pink') {
            result.milkType = 'นมสตรอว์เบอร์รี่ (Strawberry Milk)';
            result.amount = 30 - ageMonths;
        }

        if (result.amount < 0) result.amount = 0;

        return result;
    }
}

module.exports = CowModel;