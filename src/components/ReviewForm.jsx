import { useForm } from 'react-hook-form';
import { Star, Feather, Send } from 'lucide-react';
import useReviewStore from '../store/useReviewStore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const { addReview, isReviewLoading } = useReviewStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: { rating: 5, description: '' },
  });

  const onSubmit = async (data) => {
    try {
      await addReview(id, data);
      navigate(`/books/${id}`);
      reset(); // clear form on success
    } catch {}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <Feather size={24} />
        Add Your Review
      </h2>

      {/* Rating */}
      <div>
        <label htmlFor="rating" className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <Star className="text-yellow-500" size={20} />
          Rating
        </label>
        <select
          id="rating"
          {...register('rating', { required: true, valueAsNumber: true })}
          className={`mt-1 block w-24 px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.rating ? 'border-red-500' : 'border-gray-300'
          }`}
          defaultValue={5}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.rating && <p className="text-red-500 text-sm mt-1">Rating is required</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="text-lg font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: true, minLength: 5 })}
          rows={4}
          className={`mt-1 block w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${
            errors.description ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
          }`}
          placeholder="Write your review..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.type === 'minLength'
              ? 'Must be at least 5 characters'
              : 'Description is required'}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isReviewLoading}
        className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-xl transition ${
          isReviewLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Send size={18} />
        {isReviewLoading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
