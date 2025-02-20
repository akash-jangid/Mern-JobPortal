import axios from "axios";
import React, { useEffect } from "react";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { setCompanies } from "../redux/companySlice";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/my-companies`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCompanies();
  }, []);
};

export default useGetAllCompanies;
