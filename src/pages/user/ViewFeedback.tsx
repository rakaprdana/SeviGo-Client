import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { FeedbackData } from "../../types/admin-feedback";
import ImagePreviewFromAPI from "../../components/ImagePreview";
import { AxiosError } from "axios";

const ViewFeedback: React.FC = () => {
  const { feedback_id } = useParams<{ feedback_id: string }>();
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await api.get(`admin-feedback/${feedback_id}`);
        if (response.data.code === 200) {
          setFeedback(response.data.data);
        } else {
          setError("Gagal memuat data.");
        }
      } catch (err: unknown) {
        setError(
          `Terjadi kesalahan: ${err instanceof AxiosError && err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [feedback_id]);

  if (loading)
    return (
      <div className="bg-orange-500 text-white p-4 w-1/5 flex justify-center items-center m-64 ml-96 text-2xl font-bold rounded-xl">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="lg:bg-gray-100 h-auto lg:py-8 lg:px-4 rounded-lg">
      <div className="max-w-4xl mx-auto lg:bg-white lg:p-6 rounded-lg lg:shadow-lg">
        <h1 className="text-xl lg:text-3xl font-semibold text-center text-white bg-orange-500 p-4 mb-8 rounded-lg">
          Admin Feedback
        </h1>
        {feedback ? (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row items-center lg:justify-between space-y-4 lg:space-x-4">
              {/* Image Section */}
              <div className="w-full lg:w-4/5 rounded-lg flex justify-center items-center">
                <ImagePreviewFromAPI
                  alt="Feedback"
                  image={feedback.attachment}
                />
              </div>
              {/* Feedback Detail Section */}
              <div className="lg:w-3/4 border border-gray-300 rounded-lg shadow-sm p-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                  Feedback Detail
                </h2>
                <div className="border-t border-gray-300 pt-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Title:{" "}
                    <span className="text-gray-500 ">{feedback.title}</span>
                  </h3>
                  <p className="text-lg text-gray-700 mb-2">
                    Date:{" "}
                    <span className="text-gray-500">
                      {feedback.date?.split(",")[0]}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className=" border border-gray-300 rounded-lg shadow-sm p-6">
              <p className="text-xl font-bold text-gray-700">Description</p>
              <p className="text-gray-500">{feedback.description}</p>
            </div>
          </div>
        ) : (
          <div>Data tidak tersedia.</div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;
