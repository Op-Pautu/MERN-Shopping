import "./featuredInfo.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState } from 'react';
import { useEffect } from 'react';
import {userRequest} from '../../requestMethods'
export default function FeaturedInfo() {
  const [income, setIncome] = useState([])
  const [percentage, setPercentage] = useState([])

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income")
        setIncome(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    getIncome();
  }, []);
  
  useEffect(() => {
    if (income.length >= 2) {
      const percentageValue = ((income[1]?.total - income[0]?.total) / income[0]?.total) * 100;
      setPercentage(percentageValue);
    }
  }, [income]);
  
  return (
   
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
          %{percentage}
            {percentage < 0 ? (   
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
