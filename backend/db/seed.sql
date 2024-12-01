INSERT INTO "User" (email, password, username) VALUES
('alice@example.com', 'password123', 'alice123'),
('bob@example.com', 'password456', 'bobster'),
('charlie@example.com', 'password789', 'charliec');

INSERT INTO "Post" (title, content, published, created_at, updated_at, author_id) VALUES
('Welcome to My Blog', 'This is the first post on my blog.', true, now(), now(), 1),
('My Second Post', 'Here are some updates from my life.', false, now(), now(), 1),
('Tech Tips', 'Sharing some useful tech tips and tricks.', true, now(), now(), 2),
('Random Thoughts', 'Some random musings and ideas.', true, now(), now(), 3);

INSERT INTO "Comment" (content, created_at, author_id, post_id) VALUES
('Great post, Alice!', now(), 2, 1),
('Thanks for sharing!', now(), 2, 1),
('Looking forward to more updates.', now(), 3, 2),
('Helpful tips, Bob!', now(), 1, 3),
('Interesting thoughts.', now(), 2, 4);
