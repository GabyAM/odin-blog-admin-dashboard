import { useAuth } from '../hooks/useAuth';
import { usePagination } from '../hooks/usePagination';
import '../styles/posts.css';
import { Posts } from './Posts';
import { toast } from 'react-hot-toast';

export function Drafts() {
    const { encodedToken } = useAuth();

    const {
        results,
        loading,
        error,
        fetchNextPage,
        loadingNextPage,
        hasNextPage,
        refetch
    } = usePagination('http://localhost:3000/unpublished_posts', 4);

    function publishPost(button, id) {
        button.disabled = true;
        const promise = fetch(`http://localhost:3000/post/${id}/publish`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `bearer ${encodedToken}`
            }
        })
            .then((res) => {
                if (!res.ok && res.status !== 400) {
                    throw new Error(`couldn't publish the post`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.errors) {
                    throw new Error(
                        "The post doesn't meet the requirements to be published"
                    );
                }
                refetch();
            })
            .catch((e) => {
                button.disabled = false;
                throw new Error(e.message);
            });

        toast.promise(promise, {
            loading: 'Publishing post...',
            success: `Post published successfully`,
            error: (error) => `${error.message}`
        });
    }

    return (
        <Posts
            title={'Drafts'}
            posts={results}
            loading={loading}
            error={error}
            fetchNextPage={fetchNextPage}
            loadingNextPage={loadingNextPage}
            hasNextPage={hasNextPage}
            updatePostStatus={(button, id) => publishPost(button, id)}
        ></Posts>
    );
}
