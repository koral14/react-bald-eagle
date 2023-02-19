import React from 'react';

/*
Roy:
You are using header in the Header component already. This should be a <div> or a <section> instead.
*/

const Home = () => {
    return (
        <>
            <header>
                <h1>Anything ToDo?</h1>
                <h2>Home page</h2>
            </header>
        </>
    )
}

export default Home;