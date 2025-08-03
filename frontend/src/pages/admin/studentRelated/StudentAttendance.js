import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  FormControl
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const StudentAttendance = ({ situation }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { currentUser, userDetails, loading } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);
  const { response, error, statestatus } = useSelector((state) => state.student);

  const [studentID, setStudentID] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [chosenSubName, setChosenSubName] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === 'Student') {
      const stdID = params.id;
      setStudentID(stdID);
      dispatch(getUserDetails(stdID, 'Student'));
    } else if (situation === 'Subject') {
      const { studentID, subjectID } = params;
      setStudentID(studentID);
      setChosenSubName(subjectID);
      dispatch(getUserDetails(studentID, 'Student'));
    }
  }, [dispatch, params, situation]);

  useEffect(() => {
    if (userDetails?.sclassName && situation === 'Student') {
      dispatch(getSubjectList(userDetails.sclassName._id, 'ClassSubjects'));
    }
  }, [dispatch, userDetails?.sclassName, situation]);

  const changeHandler = (event) => {
    const selected = subjectsList.find(subject => subject.subName === event.target.value);
    if (selected) {
      setSubjectName(selected.subName);
      setChosenSubName(selected._id);
    }
  };

  const fields = {
    subName: chosenSubName,
    status,
    date
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStudentFields(studentID, fields, 'StudentAttendance'));
  };

  useEffect(() => {
    if (response) {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (error) {
      setMessage('An error occurred.');
      setShowPopup(true);
      setLoader(false);
    } else if (statestatus === 'added') {
      setMessage('Done Successfully');
      setShowPopup(true);
      setLoader(false);
    }
  }, [response, error, statestatus]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box sx={{ flex: '1 1 auto', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 550, px: 3, py: '100px', width: '100%' }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Student Name: {userDetails?.name || '—'}</Typography>
              {currentUser?.teachSubject && (
                <Typography variant="h4">Subject Name: {currentUser.teachSubject.subName}</Typography>
              )}
            </Stack>

            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                {situation === 'Student' && (
                  <FormControl fullWidth>
                    <InputLabel id="select-subject-label">Select Subject</InputLabel>
                    <Select
                      labelId="select-subject-label"
                      value={subjectName}
                      label="Select Subject"
                      onChange={changeHandler}
                      required
                    >
                      {subjectsList?.length ? (
                        subjectsList.map((subject) => (
                          <MenuItem key={subject._id} value={subject.subName}>
                            {subject.subName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>Add Subjects For Attendance</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )}

                <FormControl fullWidth>
                  <InputLabel id="attendance-status-label">Attendance Status</InputLabel>
                  <Select
                    labelId="attendance-status-label"
                    value={status}
                    label="Attendance Status"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <MenuItem value="Present">Present</MenuItem>
                    <MenuItem value="Absent">Absent</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <PurpleButton
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  variant="contained"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </PurpleButton>
              </Stack>
            </form>
          </Box>
        </Box>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default StudentAttendance;
