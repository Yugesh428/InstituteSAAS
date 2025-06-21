import { Request, Response } from "express";
import sequelize from "../Database/connection";
import { IExtendedRequest } from "../middleware/type";

const createCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;

  const {
    coursePrice,
    courseName,
    courseDescription,
    courseDuration,
    courseLevel,
  } = req.body;

  console.log("📦 Request Body:", req.body); // Debug log

  if (
    !coursePrice ||
    !courseName ||
    !courseDescription ||
    !courseDuration ||
    !courseLevel
  ) {
    return res.status(400).json({
      message:
        "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel",
    });
  }

  const courseThumbnail = req.file ? req.file.path : null;

  const returnedData = await sequelize.query(
    `INSERT INTO course_${instituteNumber}(coursePrice, courseName, courseDescription, courseDuration, courseLevel, courseThumbnail) VALUES (?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        coursePrice,
        courseName,
        courseDescription,
        courseDuration,
        courseLevel,
        courseThumbnail,
      ],
    }
  );

  console.log("✅ Inserted Course:", returnedData);

  res.status(200).json({
    message: "Course created successfully",
  });
};

const deleteCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;

  const [courseData]: any = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
    {
      replacements: [courseId],
    }
  );

  if (!courseData || courseData.length === 0) {
    return res.status(404).json({
      message: "No course with that ID",
    });
  }

  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`, {
    replacements: [courseId],
  });

  res.status(200).json({
    message: "Course deleted successfully",
  });
};

const getAllCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;

  // Fixed join query
  const [datas]: any = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} 
     JOIN category_${instituteNumber} 
     ON course_${instituteNumber}.categoryID = category_${instituteNumber}.id`
  );

  const [courses]: any = await sequelize.query(
    `SELECT * FROM course_${instituteNumber}`
  );

  res.status(200).json({
    message: "Course fetched",
    data: courses,
    datas,
  });
};

const getSingleCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;

  const [course]: any = await sequelize.query(
    `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
    {
      replacements: [courseId],
    }
  );

  res.status(200).json({
    message: "Single course fetched",
    data: course,
  });
};

export { createCourse, deleteCourse, getSingleCourse, getAllCourse };
