import React from 'react';

export default class Layout extends React.Component {
  render(){
    return (
      <div>
        <header>
          <div class="navbar navbar-default" role="navigation">
            <div class="container">
              <div class="navbar-header">
                <a href="/" class="navbar-brand">Formula Mommy</a>
              </div>
              <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-left">
                  <li>
                    <a href="{{blogPathFor "blogIndex"}}">Blog</a>
                  </li>
                  <li>
                    <a href="{{blogPathFor "blogAdmin"}}">Admin Area (must login)</a>
                  </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                  {{> loginButtons}}
                </ul>
              </div>
            </div>
          </div>
        </header>
        <main>
          {this.props.content}
        </main>
        <footer>
          <div class="container">
            <p>
              Formula Mommy Copyright 2016
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
