// schema/users/user.schema.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infra/database/sequelize';

interface UserAttributes {
  fullName: string;
  username: string;
  profilePic?: string;
  email: string;
  password: string;
  id: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'profilePic'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public fullName!: string;
  public username!: string;
  public profilePic?: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: ''
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

export default User;
