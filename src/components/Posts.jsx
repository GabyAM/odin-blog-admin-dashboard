import { PostCard } from './PostCard';
import { PostCardSkeleton } from './PostCardSkeleton';

export function Posts({
    title,
    posts,
    loading,
    error,
    fetchNextPage,
    loadingNextPage,
    hasNextPage,
    updatePostStatus
}) {
    return (
        <section className="main-section">
            <h1 className="section-title">{title}</h1>
            <div className="posts-grid">
                {loading ? (
                    <>
                        <PostCardSkeleton></PostCardSkeleton>
                        <PostCardSkeleton></PostCardSkeleton>
                        <PostCardSkeleton></PostCardSkeleton>
                        <PostCardSkeleton></PostCardSkeleton>
                    </>
                ) : (
                    !error &&
                    posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onToggleState={updatePostStatus}
                        ></PostCard>
                    ))
                )}
                {loadingNextPage && (
                    <>
                        <PostCardSkeleton></PostCardSkeleton>
                        <PostCardSkeleton></PostCardSkeleton>
                        <PostCardSkeleton></PostCardSkeleton>
                        <PostCardSkeleton></PostCardSkeleton>
                    </>
                )}
            </div>
            {hasNextPage && !loading && !loadingNextPage && (
                <button
                    className="load-more-button"
                    onClick={() => {
                        fetchNextPage();
                    }}
                >
                    Load more
                </button>
            )}
        </section>
    );
}
