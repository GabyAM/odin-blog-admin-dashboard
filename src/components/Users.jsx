import { UserCard } from './UserCard';
import '../styles/usersgrid.css';
import { UserCardSkeleton } from './UserCardSkeleton';
import { useState } from 'react';
import { DeletePopup } from './DeletePopup';

export function Users({
    title,
    users,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    changeUserRole,
    deleteUser
}) {
    const [deletingId, setDeletingId] = useState(null);
    if (!users || users.pages[0].results.length > 0)
        return (
            <section className="main-section">
                {deletingId && (
                    <DeletePopup
                        title="Delete user"
                        description="You are about to delete this user and it can't be recovered later. are you sure?"
                        onDelete={() => deleteUser(deletingId)}
                        onClickOutside={() => setDeletingId(null)}
                    ></DeletePopup>
                )}
                <h1 className="section-title">{title}</h1>
                <div className="users-grid">
                    {isLoading ? (
                        <>
                            <UserCardSkeleton></UserCardSkeleton>
                            <UserCardSkeleton></UserCardSkeleton>
                            <UserCardSkeleton></UserCardSkeleton>
                            <UserCardSkeleton></UserCardSkeleton>
                        </>
                    ) : (
                        !error &&
                        users.pages.map((page) =>
                            page.results.map((user) => (
                                <UserCard
                                    key={user._id}
                                    user={user}
                                    onChangeRole={changeUserRole}
                                    onDelete={(id) => setDeletingId(id)}
                                ></UserCard>
                            ))
                        )
                    )}
                    {isFetchingNextPage && (
                        <>
                            <UserCardSkeleton></UserCardSkeleton>
                            <UserCardSkeleton></UserCardSkeleton>
                            <UserCardSkeleton></UserCardSkeleton>
                            <UserCardSkeleton></UserCardSkeleton>
                        </>
                    )}
                </div>
                {hasNextPage && !isLoading && !isFetchingNextPage && (
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
