CREATE TABLE blogs (
 id SERIAL PRIMARY KEY,
 author TEXT,
 url TEXT NOT NULL,
 title TEXT NOT NULL,
 likes INTEGER DEFAULT 0);

INSERT INTO blogs (author, url, title, likes) VALUES ('Dan Abramov', 'www.danabramov.com', 'Writing Resilient Components', 0);

INSERT INTO blogs (author, url, title) VALUES ('Martin Fowler', 'www.martinfowler.com', 'Is High Quality Software Worth of the Cost?');