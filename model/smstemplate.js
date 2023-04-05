const {DataTypes} = require ("sequelize");
module.exports = (sequelize,Sequelize) =>{
 const Templates = sequelize?.define(
    "template",
    {
    id : { type : DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    text: DataTypes.STRING,
},
 { tabelName: "template" }
 );
 return Templates;
    };
 
