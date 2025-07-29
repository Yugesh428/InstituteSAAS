import { Request, Response } from "express";
import sequelize from "../../../Database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import { QueryTypes } from "sequelize";

const createCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;

  if (!instituteNumber) {
    return res.status(400).json({ message: "Missing institute number" });
  }

  const {
    coursePrice,
    courseName,
    courseDescription,
    courseDuration,
    courseLevel,
    categoryId,
  } = req.body;

  if (
    !coursePrice ||
    !courseName ||
    !courseDescription ||
    !courseDuration ||
    !courseLevel ||
    !categoryId
  ) {
    return res.status(400).json({
      message:
        "Please provide coursePrice, courseName, courseDescription, courseDuration, courseLevel, categoryId",
    });
  }

  const courseThumbnail = req.file ? req.file.path : null;

  try {
    const returnedData = await sequelize.query(
      `INSERT INTO course_${instituteNumber} (coursePrice, courseName, courseDescription, courseDuration, courseLevel, courseThumbnail, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          coursePrice,
          courseName,
          courseDescription,
          courseDuration,
          courseLevel,
          courseThumbnail,
          categoryId,
        ],
      }
    );

    console.log("Inserted course data:", returnedData);

    return res.status(200).json({
      message: "Course created successfully",
    });
  } catch (error) {
    console.error("DB Error in createCourse:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;

  if (!instituteNumber) {
    return res.status(400).json({ message: "Missing institute number" });
  }

  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  try {
    const courseData = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
        type: QueryTypes.SELECT,
      }
    );

    if (courseData.length === 0) {
      return res.status(404).json({
        message: "No course with that id",
      });
    }

    await sequelize.query(
      `DELETE FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
        type: QueryTypes.DELETE,
      }
    );

    return res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("DB Error in deleteCourse:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;

  if (!instituteNumber) {
    return res.status(400).json({ message: "Missing institute number" });
  }

  try {
    const courses = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} JOIN category_${instituteNumber} ON course_${instituteNumber}.categoryId = category_${instituteNumber}.id`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Courses fetched",
      data: courses,
    });
  } catch (error) {
    console.error("DB Error in getAllCourse:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;

  if (!instituteNumber) {
    return res.status(400).json({ message: "Missing institute number" });
  }

  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  try {
    const course = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
        type: QueryTypes.SELECT,
      }
    );

    if (course.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Single course fetched",
      data: course,
    });
  } catch (error) {
    console.error("DB Error in getSingleCourse:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { createCourse, deleteCourse, getSingleCourse, getAllCourse };
