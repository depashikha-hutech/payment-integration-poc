const {DataTypes} = require ("sequelize");
module.exports = (sequelize,Sequelize) =>{
 const Subscriptions = sequelize?.define(
    "subscriptions",
    {
        id : { type : DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    planID:  { type : DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    amount: { type: DataTypes.DOUBLE, allowNull: false},
    sscode: { type : DataTypes.STRING,allowNull: false},
    userID:{ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    orderId:{ type: DataTypes.STRING,  allowNull: false},
    status: DataTypes.STRING,
    message: DataTypes.STRING,
    resCode: DataTypes.STRING,
    rrn: DataTypes.STRING,
},
 { tabelName: "subscriptions" }
 );
 return Subscriptions;
    };
 
