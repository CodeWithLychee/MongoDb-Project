import React from "react";

function AboutUs() {
  return (
    <>
      <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg font-sans mt-20">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          About Us
        </h1>
        <p className="text-justify mb-6">
          Welcome to our Movie Recommendation Web App! This project is built
          with love and dedication by students of Thapar Institute of
          Engineering and Technology.
        </p>

        <div className="mb-6 p-4 border-l-4 border-blue-600 bg-gray-100 rounded-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Sanjamjot Singh
          </h2>
          <p>
            <strong>Roll Number:</strong> 102203270
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:sbindra_be22@gmail.com"
              className="text-blue-600 hover:underline"
            >
              sbindra_be22@gmail.com
            </a>
          </p>
        </div>

        <div className="mb-6 p-4 border-l-4 border-blue-600 bg-gray-100 rounded-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Abhinav Sharma
          </h2>
          <p>
            <strong>Roll Number:</strong> 102203255
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:asharma_be22@gmail.com"
              className="text-blue-600 hover:underline"
            >
              asharma_be22@gmail.com
            </a>
          </p>
        </div>

        <p className="text-justify">
          Thank you for visiting our site. We hope you enjoy discovering new
          movies!
        </p>
      </div>
    </>
  );
}

export default AboutUs;
