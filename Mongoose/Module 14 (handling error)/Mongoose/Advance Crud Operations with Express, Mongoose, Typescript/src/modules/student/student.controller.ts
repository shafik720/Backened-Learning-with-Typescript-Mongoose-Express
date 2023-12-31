import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.joi.validation';
import studentZodValidationSchema from './student.zod.validation';

// --- create a student data
const createStudent = async (req: Request, res: Response) => {
  try {
    const students = req.body.students;

    // const { error } = studentValidationSchema.validate(students); //-- validating with 'joi validator' package

    const zodParsedData = studentZodValidationSchema.parse(students)

    // if (error) {
    // error for joi validation
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something Went Wrong',
    //     error : error.details
    //   })
    // }

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err
    })
  }
};

// --- get all student data
const getAllStudentsData = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students data retrieved successfully ',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// --- get single student data
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudent(studentId);

    res.status(200).json({
      success: true,
      message: 'Got Single Student data Successfully ',
      data: result
    })
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudentsData,
  getSingleStudent
};
