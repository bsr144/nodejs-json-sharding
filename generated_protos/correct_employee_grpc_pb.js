// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var correct_employee_pb = require('./correct_employee_pb.js');

function serialize_correct_employee_CorrectEmployeesListResponse(arg) {
  if (!(arg instanceof correct_employee_pb.CorrectEmployeesListResponse)) {
    throw new Error(
      'Expected argument of type correct_employee.CorrectEmployeesListResponse'
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_correct_employee_CorrectEmployeesListResponse(buffer_arg) {
  return correct_employee_pb.CorrectEmployeesListResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_correct_employee_GetCorrectEmployeesRequest(arg) {
  if (!(arg instanceof correct_employee_pb.GetCorrectEmployeesRequest)) {
    throw new Error(
      'Expected argument of type correct_employee.GetCorrectEmployeesRequest'
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_correct_employee_GetCorrectEmployeesRequest(buffer_arg) {
  return correct_employee_pb.GetCorrectEmployeesRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

var CorrectEmployeeServiceService = (exports.CorrectEmployeeServiceService = {
  listEmployee: {
    path: '/correct_employee.CorrectEmployeeService/ListEmployee',
    requestStream: false,
    responseStream: false,
    requestType: correct_employee_pb.GetCorrectEmployeesRequest,
    responseType: correct_employee_pb.CorrectEmployeesListResponse,
    requestSerialize: serialize_correct_employee_GetCorrectEmployeesRequest,
    requestDeserialize: deserialize_correct_employee_GetCorrectEmployeesRequest,
    responseSerialize: serialize_correct_employee_CorrectEmployeesListResponse,
    responseDeserialize:
      deserialize_correct_employee_CorrectEmployeesListResponse,
  },
});

exports.CorrectEmployeeServiceClient = grpc.makeGenericClientConstructor(
  CorrectEmployeeServiceService
);
