const CowModel = require('../models/cowModel');

let totalProduction = {
    plain: 0,
    chocolate: 0,
    strawberry: 0
};

exports.getIndex = (req, res) => {
    res.render('index', { error: null, totalProduction });
};

exports.calculateMilk = async (req, res) => {
    const { cowId } = req.body;
    const idPattern = /^[1-9]\d{7}$/;

    if (!idPattern.test(cowId)) {
        return res.render('index', { 
            error: 'รหัสไม่ถูกต้อง: ต้องเป็นตัวเลข 8 หลักและตัวแรกไม่ใช่ 0',
            totalProduction
        });
    }

    try {
        const cow = await CowModel.getCowById(cowId);

        if (!cow) {
            return res.render('index', { 
                error: `ไม่พบข้อมูลวัวรหัส ${cowId} ในฐานข้อมูล`,
                totalProduction
            });
        }

        const milkResult = CowModel.calculateMilk(cow);

        if (cow.color === 'White') totalProduction.plain += milkResult.amount;
        else if (cow.color === 'Brown') totalProduction.chocolate += milkResult.amount;
        else if (cow.color === 'Pink') totalProduction.strawberry += milkResult.amount;

        // เตรียมข้อมูลส่งกลับ View (แปลง snake_case จาก DB เป็น camelCase)
        const cowDataForView = {
            id: cow.cow_id,
            color: cow.color,
            ageYears: cow.age_year,
            ageMonths: cow.age_month
        };

        res.render('result', { cow: cowDataForView, milkResult });

    } catch (err) {
        console.log(err);
        res.render('index', { 
            error: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล',
            totalProduction
        });
    }
};