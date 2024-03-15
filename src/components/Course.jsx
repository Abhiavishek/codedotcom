import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import live from "../assets/live.png";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Courses() {
    const placeholderData = {
        courses: [
          {
            course_id: 1,
            week_id: 1,
            course_thumbnail: "https://img.icons8.com/?size=96&id=13441&format=png",
            course_name: "Python Course",
            course_rating: 4.8,
            course_price: 600,
            course_instructor: [
              { course_instructor_name: "John Doe" },
              { course_instructor_name: "Jane Smith" },
            ],
            live_start_time: "09:00",
            live_end_time: "10:30",
          },
          {
            course_id: 2,
            week_id: 2,
            course_thumbnail: "https://img.icons8.com/?size=160&id=lTKW3iI3wIT0&format=png",
            course_name: "Java Course",
            course_rating: 4.2,
            course_price: 750,
            course_instructor: [
              { course_instructor_name: "Michael Johnson" },
              { course_instructor_name: "Emily White" },
            ],
            live_start_time: "10:00",
            live_end_time: "11:30",
          },
          {
            course_id: 3,
            week_id: 3,
            course_thumbnail: "https://img.icons8.com/?size=96&id=v8RpPQUwv0N8&format=png",
            course_name: "Html Course",
            course_rating: 4.5,
            course_price: 700,
            course_instructor: [
              { course_instructor_name: "David Brown" },
              { course_instructor_name: "Sophia Miller" },
            ],
            live_start_time: "11:30",
            live_end_time: "12:45",
          },
          {
            course_id: 4,
            week_id: 4,
            course_thumbnail: "https://img.icons8.com/?size=160&id=0Da6k7SMq0hs&format=png",
            course_name: "React Course",
            course_rating: 4.7,
            course_price: 800,
            course_instructor: [
              { course_instructor_name: "Andrew Wilson" },
              { course_instructor_name: "Olivia Davis" },
            ],
            live_start_time: "21:07",
            live_end_time: "21:30",
          },
          {
            course_id: 5,
            week_id: 5,
            course_thumbnail: "https://img.icons8.com/?size=96&id=PXTY4q2Sq2lG&format=png",
            course_name: "JavaScript Course",
            course_rating: 4.6,
            course_price: 700,
            course_instructor: [
              { course_instructor_name: "Ethan Taylor" },
              { course_instructor_name: "Ava Harris" },
            ],
            live_start_time: "15:00",
            live_end_time: "16:30",
          },
          {
            course_id: 6,
            week_id: 6,
            course_thumbnail: "https://img.icons8.com/?size=160&id=pB8mjNJpo2FG&format=png",
            course_name: "CSS Course",
            course_rating: 4.4,
            course_price: 650,
            course_instructor: [
              { course_instructor_name: "Liam Robinson" },
              { course_instructor_name: "Emma Turner" },
            ],
            live_start_time: "16:30",
            live_end_time: "18:00",
          },
        ],
      };
  const [currentDateTime, setCurrentDateTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const isCourseLive = (courseStartTime, courseEndTime) => {
    const startTime = moment(courseStartTime, "HH:mm");
    const endTime = moment(courseEndTime, "HH:mm");

    return currentDateTime.isBetween(startTime, endTime);
  };

  return (
    <>
      <div className="container mx-auto my-4 flex flex-wrap">
        {placeholderData.courses.length > 0 ? (
          placeholderData.courses.map((data) => {
            const liveNow = isCourseLive(
              data.live_start_time,
              data.live_end_time
            );
            const courseName =
              data.course_name &&
              data.course_name
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            return (
              <Link
                to='/livecourse'
                key={data.week_id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
              >
                <div
                  className={`course-card rounded shadow-sm overflow-hidden ${
                    liveNow ? "border-4 border-red-500" : ""
                  }`}
                >
                  <div className="course-image">
                    <img
                      src={data.course_thumbnail}
                      alt={`Thumbnail for ${courseName} course`}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div className="course-details px-4 py-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">
                        {courseName}
                      </span>
                      <span className="flex items-center">
                        {data.course_rating} <FaStar className="text-yellow-500" />
                      </span>
                    </div>
                    <div>Price: Rs {data.course_price}</div>
                    <div>
                      Instructors:{" "}
                      {data.course_instructor.map((instructor, index) => (
                        <span key={index} className="mx-1">
                          {instructor.course_instructor_name}
                          {index !== data.course_instructor.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                    {liveNow && (
                      <div className="live-symbol">
                        <img src={live} alt="Live Now" height={'40px'} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div>Loading all courses...</div>
        )}
      </div>
    </>
  );
}
