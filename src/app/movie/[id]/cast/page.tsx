import { getMovieCastById } from '../../../../lib/api';

interface CastMember {
  cast_id?: number;
  id: number;
  name: string;
  profile_path: string | null;
}

export default async function Page({ params }: { params: { id: string } }) {
  const cast = await getMovieCastById(params.id);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Cast</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cast && cast.length > 0 ? (
          cast.map((actor: CastMember) => (
            <div key={actor.cast_id || actor.id} className="flex flex-col items-center bg-zinc-900 rounded-lg p-2">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-green-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mb-2">
                  No Image
                </div>
              )}
              <span className="text-white text-center font-semibold">{actor.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No cast information available.</p>
        )}
      </div>
    </div>
  );
} 