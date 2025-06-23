import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import sequelize from "../../Database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../Services/generateRandomPassword";
import sendMail from "../../Services/sendMail";

const createTeacher = async (req: IExtendedRequest, res: Response) => {
  // teacher ko k k data chayenxa tyo accept garam
  const instituteNumber = req.user?.currentInstituteNumber;
  const {
    teacherName,
    teacherEmail,
    teacherPhoneNumber,
    teacherExpertise,
    teacherSalary,
    teacherJoinedDate,
    courseId,
  } = req.body;
  const teacherPhoto = req.file
    ? req.file.path
    : "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";
  if (
    !teacherName ||
    !teacherEmail ||
    !teacherPhoneNumber ||
    !teacherExpertise ||
    !teacherSalary ||
    !teacherJoinedDate
  ) {
    return res.status(400).json({
      message:
        "Please provide teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,teacherSalary,teacherJoinedDate",
    });
  }
  // password generate functionnn
  const data = generateRandomPassword(teacherName);
  const insertedData = await sequelize.query(
    `INSERT INTO teacher_${instituteNumber}(teacherName,teacherEmail,teacherPhoneNumber,teacherExpertise,joinedDate,salary,teacherPhoto,teacherPassword) VALUES(?,?,?,?,?,?,?,?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [
        teacherName,
        teacherEmail,
        teacherPhoneNumber,
        teacherExpertise,
        teacherJoinedDate,
        teacherSalary,
        teacherPhoto,
        data.hashedVersion,
      ],
    }
  );

  const teacherData: { id: string }[] = await sequelize.query(
    `SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail=?`,
    {
      type: QueryTypes.SELECT,
      replacements: [teacherEmail],
    }
  );

  await sequelize.query(
    `UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,
    {
      type: QueryTypes.UPDATE,
      replacements: [teacherData[0].id, courseId],
    }
  );

  // send mail function goes here
  const mailInformation = {
    to: teacherEmail,
    subject: "Welcome to our saas MERN project",
    text: `Welcome xa hai, Email : ${teacherEmail}, Password : ${data.plainVersion}`,
  };
  await sendMail(mailInformation);

  res.status(200).json({
    message: "teacher created",
  });
};

const getTeachers = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const teachers = await sequelize.query(
    `SELECT * FROM teacher_${instituteNumber}`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).json({
    message: "teachers fetched",
    data: teachers,
  });
};

const deleteTeacher = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const id = req.params.id;
  await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id=?`, {
    type: QueryTypes.DELETE,
    replacements: [id],
  });
  res.status(200).json({
    message: "delete Teacher successfully",
  });
};

export { createTeacher, getTeachers, deleteTeacher };
