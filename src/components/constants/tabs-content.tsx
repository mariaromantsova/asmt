import React, { ChangeEvent, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { TabContent } from "../../types";

const Visibility: React.FC = () => {
  const [className, setClassName] = useState("displayBlock");

  const setProperty = (e: ChangeEvent) => {
    setClassName(e.target.id);
  };

  return (
    <>
      <fieldset>
        <legend>
          <h4>
            visibility <i>vs</i> display <i>vs</i> opacity
          </h4>
        </legend>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Painted</th>
              <th>In layout</th>
              <th>Stacking context</th>
              <th>Pointer events</th>
              <th>Keyboard events</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/opacity" rel="noreferrer">
                  <code>opacity: 0;</code>
                </a>
              </td>
              <td>No</td>
              <td>
                <strong>Yes</strong>
              </td>
              <td>
                <strong>New</strong>
              </td>
              <td>
                <strong>Yes</strong>
              </td>
              <td>
                <strong>Yes</strong>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/visibility"
                  rel="noreferrer"
                >
                  <code>visibility: hidden;</code>
                </a>
              </td>
              <td>No</td>
              <td>
                <strong>Yes</strong>
              </td>
              <td>
                <em>Varies</em>
              </td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr>
              <td>
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/display" rel="noreferrer">
                  <code>display: none;</code>
                </a>
              </td>
              <td>No</td>
              <td>No</td>
              <td>
                <em>Varies</em>
              </td>
              <td>No</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex mt-20">
          <div className="mr-5">
            <input id="d-block" name="display" type="radio" defaultChecked onChange={setProperty} />
            <label htmlFor="d-block">display: block</label>
          </div>
          <div className="mr-5">
            <input id="d-none" name="display" type="radio" onChange={setProperty} />
            <label htmlFor="d-none">display: none;</label>
          </div>
          <div className="mr-5">
            <input id="v-visible" name="display" type="radio" onChange={setProperty} />
            <label htmlFor="v-visible">visibility: visible;</label>
          </div>
          <div className="mr-5">
            <input id="v-hidden" name="display" type="radio" onChange={setProperty} />
            <label htmlFor="v-hidden">visibility: hidden;</label>
          </div>
          <div className="mr-5">
            <input id="o-0" name="display" type="radio" onChange={setProperty} />
            <label htmlFor="o-0">opacity: 0;</label>
          </div>
          <div>
            <input id="o-100" name="display" type="radio" onChange={setProperty} />
            <label htmlFor="o-100">opacity: 100%;</label>
          </div>
        </div>

        <img src="images/cat.gif" className={`${className} mt-20`} alt="cat" />

        <blockquote>
          <ul className="mt-20">
            <li>
              The "Painted" column indicates if the browser will paint the element's background
              (e.g. <code>background-image</code>), <code>#text</code> content, and so on.
              <ul>
                <li>
                  An element cannot be painted without also participating in the page's layout, of
                  course.
                </li>
                <li>
                  This is <em>No</em> for all 3 properties and values, as the browser won't need to
                  paint the element's box as it's invisible.
                </li>
              </ul>
            </li>
            <li>
              The "In layout" column indicates if the browser will compute the layout and dimensions
              of the element - along with any of its descendants not excluded from layout.
              <ul>
                <li>
                  This is only <em>No</em> for <code>display: none;</code>, as with{" "}
                  <code>opacity: 0;</code> and <code>visibility: hidden;</code> the browser will
                  still determine the size of the element so it can correctly layout other elements
                  relative to the current element (e.g. if you have{" "}
                  <code>{`span.hidden { visibility: hidden; display: inline; }`}</code>).
                </li>
              </ul>
            </li>
            <li>
              The "Stacking context" column indicates that any use of <code>opacity</code> (except{" "}
              <code>opacity: 1.0;</code>) will create a new stacking-context, which complicates use
              of the <code>position</code> property.
            </li>
            <li>
              The "Pointer events" column indicates if the element will respond to user-interaction
              from a pointing device, such as a mouse, touch-screen, stylus, etc.
              <ul>
                <li>
                  e.g. with <code>visibility: hidden;</code> then the <code>:hover</code> state
                  won't work, and clicking the same element won't apply <code>:focus</code> or{" "}
                  <code>:active</code> either.
                </li>
                <li>
                  Additionally, the DOM won't raise any pointer events you'd handle in JavaScript
                  (e.g. <code>visibility: hidden;</code> won't raise <code>mouseclick</code>,{" "}
                  <code>touchstart</code>, etc - note that the <code>click</code> event can still be
                  raised by certain elements, like <code>&lt;button&gt;</code> if invoked by the
                  user using a non-pointer input method, such as with keyboard or voice (accessible)
                  navigation means.
                  <ul>
                    <li>
                      You can use <code>pointer-events: none;</code> to block pointer events, but{" "}
                      <strong>this won't block keyboard and other non-pointer input</strong> and so
                      should not be used to disable an element because the user can still use the
                      keyboard to interact with it (especially <code>&lt;button&gt;</code>,{" "}
                      <code>&lt;input /&gt;</code>, <code>&lt;select&gt;</code>, and{" "}
                      <code>&lt;textarea&gt;</code>).
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              The "Keyboard events" column indicates if the element can be interacted-with using
              keyboard navigation (and possibly other navigation means).
              <ul>
                <li>
                  This includes smart-device (smartphones' and tablets') browsers' "Prev/Next Field"
                  buttons for navigating <code>&lt;form&gt;</code> elements (as this uses{" "}
                  <code>tabindex</code>).
                </li>
                <li>
                  Unlike how pointer-events can be disabled in CSS using{" "}
                  <code>pointer-events: none;</code>, there is no CSS property to disable keyboard
                  interaction.
                </li>
              </ul>
            </li>
          </ul>
        </blockquote>
      </fieldset>
    </>
  );
};

export const tabsContent: TabContent[] = [
  {
    id: "0",
    title: "TDD",
    content: (
      <fieldset>
        <legend>
          <h4>Test-Driven Development</h4>
        </legend>
        <p>
          <mark>
            <b>Test-Driven Development (TDD)</b>
          </mark>{" "}
          - one of the software development methods which concept is that you{" "}
          <em>write a test before you implement a function.</em>
        </p>
        <img src="images/tdd.png" alt="TDD cycle" width={400} />
        <p>
          When writing by these principles you can <em>immediately confirm test coverage.</em> TDD
          also forces us to subdivide the function and decide what expected result is for each
          section. That <em>helps to understand more about the function before you implement.</em>
        </p>

        <p>
          <mark>Advantages:</mark>
        </p>
        <ul>
          <li>forces us to clarify our thinking before writing production code</li>
          <li>
            provides a way for members of a software development team to communicate their
            intentions with each other
          </li>
          <li>improves the structure and organization of the production code</li>
        </ul>

        <p>
          <mark>Test types:</mark>
        </p>
        <div className="d-flex">
          <div className="col">
            <img src="images/testing-pyramid.png" alt="testing pyramid" width={400} />
          </div>
          <div className="col font-small">
            <p className="pl-10">
              <mark>End-to-end tests</mark> - ensure that the entire application is functioning as
              required. End-to-end tests do exactly what the name suggests: test that the
              application is working flawlessly from start to finish. When running these tests, it
              is important to imagine the user’s perspective. How would an actual user interact with
              the app? How can tests be written to replicate that interaction? End-to-end tests are
              at the top of the testing pyramid because they usually take the longest to run.
            </p>
            <p className="pl-10">
              <mark>Integration Tests</mark> - tests that validate the interaction of a piece of
              code with external components. These components can range from databases, external
              services (APIs) and the like. Integration tests are the second layer of the test
              automation pyramid. This means that it should not be run as frequently as unit tests.
              Fundamentally, they test how a feature communicates with external dependencies.
            </p>
            <p className="pl-10">
              <mark>Unit Tests</mark> - test individual components or functionalities to validate
              that it works as expected in isolated conditions. This test suite needs to be run
              every time a new feature is added. Since TDD requires a test to be written before any
              code, the code ends up being simpler, clearer and bug-free.
            </p>
          </div>
        </div>
      </fieldset>
    ),
  },
  {
    id: "1",
    title: "Code Review",
    content: (
      <fieldset>
        <legend>
          <h4>Code Review</h4>
        </legend>
        <p>Principles:</p>
        <ul>
          <li>
            <mark>Review it thoroughly</mark> - aim to always suggest at least one specific
            improvement to the code (not just style) on the initial review.
          </li>
          <li>
            <mark>Aim to understand every changed line</mark> - the only way to know if the best
            solution is being used is to understand the current solution.
            <p>two following questions for yourself:</p>
            <ul>
              <li>"What goal does this code accomplish?"</li>
              <li>"How does it accomplish this goal?"</li>
            </ul>
          </li>
          <li>
            <mark>Build and test it yourself</mark> - pull down the code and once you've compiled
            the code, actually test it. Also run the included automatic tests, don't leave it at
            this. Try to break the code.
          </li>
          <li>
            <mark>Commenting</mark> - address any of the following problems:
            <ul>
              <li>
                The intent comment doesn't match the logic. This indicates that the comment, code,
                or both are wrong.
              </li>
              <li>
                The intent comment doesn't make sense. If the comment is confusing, it's as useful
                as no comment at all.
              </li>
              <li>The intent comment has major typos.</li>
            </ul>
          </li>
          <li>
            <mark>Review temporary code as strictly as production code</mark> - even if the code's
            solution isn't ideal, the implementation should be clean, maintainable, and reasonably
            efficient.
          </li>
          <li>
            <mark>Keep priorities straight when making suggestions</mark> - code should be:
            <ul>
              <li>functional</li>
              <li>clean and maintainable</li>
              <li>optimized</li>
            </ul>
          </li>
          <li>
            <mark>Follow up on reviews</mark> - after suggesting changes, you should be prepared to
            review it again.
          </li>
          <li>
            <mark>Reviewers are not perfect</mark> - if you are not familiar with the code or
            concepts, you may want to request that an additional reviewer provide feedback, but
            don't shy away from doing the review yourself. If you do realize you've made a mistake
            in a review, the best thing you can do is own up to it.
          </li>
        </ul>
      </fieldset>
    ),
  },
  {
    id: "2",
    title: "Inline vs Block",
    content: (
      <>
        <fieldset>
          <legend>
            <h4>Block-level Elements:</h4>
          </legend>

          <ul>
            <li>always starts on a new line.</li>
            <li>element always takes up the full width available.</li>
            <li>
              can have margins and padding on all four sides of any block element — top, right,
              left, and bottom.
            </li>
          </ul>
          <p>
            Two commonly used block elements are: <code>{`<p>`}</code> and <code>{`<div>`}</code>.
          </p>

          <p>
            This is an example of block image element using <code>{`<img>`}</code> tag:{" "}
          </p>
          <img src="images/dolphin.jpg" alt="dolphin" />

          <p>Here are the block-level elements in HTML:</p>
          <ul className="list wrap">
            <li>{`<address>`}</li>
            <li>{`<article>`}</li>
            <li>{`<aside>`}</li>
            <li>{`<blockquote>`}</li>
            <li>{`<canvas>`}</li>
            <li>{`<dd>`}</li>
            <li>{`<div>`}</li>
            <li>{`<dl>`}</li>
            <li>{`<dt>`}</li>
            <li>{`<fieldset>`}</li>
            <li>{`<figcaption>`}</li>
            <li>{`<figure>`}</li>
            <li>{`<footer>`}</li>
            <li>{`<form>`}</li>
            <li>{`<h1> - <h6>`}</li>
            <li>{`<header>`}</li>
            <li>{`<hr>`}</li>
            <li>{`<li>`}</li>
            <li>{`<main>`}</li>
            <li>{`<nav>`}</li>
            <li>{`<noscript>`}</li>
            <li>{`<ol>`}</li>
            <li>{`<p>`}</li>
            <li>{`<pre>`}</li>
            <li>{`<section>`}</li>
            <li>{`<table>`}</li>
            <li>{`<tfoot>`}</li>
            <li>{`<ul>`}</li>
            <li>{`<video>`}</li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>
            <h4>Inline Elements:</h4>
          </legend>
          <ul>
            <li>does not start on a new line.</li>
            <li>only takes up as much width as necessary.</li>
            <li>can have margins and padding only on the left and right side.</li>
          </ul>

          <p>
            The commonly used inline element is <code>{`<span>`}</code> .
          </p>

          <p>Here are the inline elements in HTML:</p>
          <ul className="list wrap">
            <li>{`<a>`}</li>
            <li>{`<abbr>`}</li>
            <li>{`<acronym>`}</li>
            <li>{`<b>`}</li>
            <li>{`<bdo>`}</li>
            <li>{`<big>`}</li>
            <li>{`<br>`}</li>
            <li>{`<button>`}</li>
            <li>{`<cite>`}</li>
            <li>{`<code>`}</li>
            <li>{`<dfn>`}</li>
            <li>{`<i>`}</li>
            <li>{`<em>`}</li>
            <li>{`<img>`}</li>
            <li>{`<input>`}</li>
            <li>{`<kbd>`}</li>
            <li>{`<label>`}</li>
            <li>{`<map>`}</li>
            <li>{`<object>`}</li>
            <li>{`<output>`}</li>
            <li>{`<q>`}</li>
            <li>{`<samp>`}</li>
            <li>{`<script>`}</li>
            <li>{`<select>`}</li>
            <li>{`<small>`}</li>
            <li>{`<span>`}</li>
            <li>{`<strong>`}</li>
            <li>{`<sub>`}</li>
            <li>{`<sup>`}</li>
            <li>{`<textarea>`}</li>
            <li>{`<time>`}</li>
            <li>{`<tt>`}</li>
            <li>{`<var>`}</li>
          </ul>
        </fieldset>
      </>
    ),
  },
  {
    id: "3",
    title: "Visibility",
    content: <Visibility />,
  },
  {
    id: "4",
    title: "Specificity",
    content: (
      <>
        <fieldset>
          <legend>
            <h4>Specificity</h4>
          </legend>
          <details>
            <summary>Selectors</summary>
            <table className="mt-20">
              <tbody>
                <tr>
                  <th>Selector</th>
                  <th>Example</th>
                  <th>Example description</th>
                </tr>
                <tr>
                  <td>
                    <em>
                      .<em>class</em>
                    </em>
                  </td>
                  <td>.intro</td>
                  <td>Selects all elements with class="intro"</td>
                </tr>
                <tr>
                  <td>
                    <em>.class1.class2</em>
                  </td>
                  <td>.name1.name2</td>
                  <td>
                    Selects all elements with both <em>name1</em> and <em>name2</em> set within its
                    class attribute
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>.class1 .class2</em>
                  </td>
                  <td>.name1 .name2</td>
                  <td>
                    Selects all elements with <em>name2</em> that is a descendant of an element with{" "}
                    <em>name1</em>
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>
                      #<em>id</em>
                    </em>
                  </td>
                  <td>#firstname</td>
                  <td>Selects the element with id="firstname"</td>
                </tr>{" "}
                <tr>
                  <td>
                    <em>*</em>
                  </td>
                  <td>*</td>
                  <td>Selects all elements</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      <em>element</em>
                    </em>
                  </td>
                  <td>p</td>
                  <td>Selects all &lt;p&gt; elements</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      <em>element.class</em>
                    </em>
                  </td>
                  <td>p.intro</td>
                  <td>Selects all &lt;p&gt; elements with class="intro"</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      <em>element,element</em>
                    </em>
                  </td>
                  <td>div, p</td>
                  <td>Selects all &lt;div&gt; elements and all &lt;p&gt; elements</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      <em>element</em> <em>element</em>
                    </em>
                  </td>
                  <td>div p</td>
                  <td>Selects all &lt;p&gt; elements inside &lt;div&gt; elements</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      <em>element</em>&gt;<em>element</em>
                    </em>
                  </td>
                  <td>div &gt; p</td>
                  <td>Selects all &lt;p&gt; elements where the parent is a &lt;div&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      <em>element</em>+<em>element</em>
                    </em>
                  </td>
                  <td>div + p</td>
                  <td>
                    Selects the first &lt;p&gt; element that is placed immediately after &lt;div&gt;
                    elements
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>
                      <em>element1</em>~<em>element2</em>
                    </em>
                  </td>
                  <td>p ~ ul</td>
                  <td>Selects every &lt;ul&gt; element that is preceded by a &lt;p&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      [<em>attribute</em>]
                    </em>
                  </td>
                  <td>[target]</td>
                  <td>Selects all elements with a target attribute</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      [<em>attribute</em>=<em>value</em>]
                    </em>
                  </td>
                  <td>[target=_blank]</td>
                  <td>Selects all elements with target="_blank"</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      [<em>attribute</em>~=<em>value</em>]
                    </em>
                  </td>
                  <td>[title~=flower]</td>
                  <td>Selects all elements with a title attribute containing the word "flower"</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      [<em>attribute</em>|=<em>value</em>]
                    </em>
                  </td>
                  <td>[lang|=en]</td>
                  <td>
                    Selects all elements with a lang attribute value equal to "en" or starting with
                    "en-"
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>
                      [<em>attribute</em>^=<em>value</em>]
                    </em>
                  </td>
                  <td>a[href^="https"]</td>
                  <td>
                    Selects every &lt;a&gt; element whose href attribute value begins with "https"
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>
                      [<em>attribute</em>$=<em>value</em>]
                    </em>
                  </td>
                  <td>a[href$=".pdf"]</td>
                  <td>
                    Selects every &lt;a&gt; element whose href attribute value ends with ".pdf"
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>
                      [<em>attribute</em>*=<em>value</em>]
                    </em>
                  </td>
                  <td>a[href*="w3schools"]</td>
                  <td>
                    Selects every &lt;a&gt; element whose href attribute value contains the
                    substring "w3schools"
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:active</em>
                  </td>
                  <td>a:active</td>
                  <td>Selects the active link</td>
                </tr>
                <tr>
                  <td>
                    <em>::after</em>
                  </td>
                  <td>p::after</td>
                  <td>Insert something after the content of each &lt;p&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>::before</em>
                  </td>
                  <td>p::before</td>
                  <td>Insert something before&nbsp;the content of each &lt;p&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>:checked</em>
                  </td>
                  <td>input:checked</td>
                  <td>Selects every checked &lt;input&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>:default</em>
                  </td>
                  <td>input:default</td>
                  <td>Selects the default &lt;input&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>:disabled</em>
                  </td>
                  <td>input:disabled</td>
                  <td>Selects every disabled &lt;input&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>:empty</em>
                  </td>
                  <td>p:empty</td>
                  <td>
                    Selects every &lt;p&gt; element that has no children (including text nodes)
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:enabled</em>
                  </td>
                  <td>input:enabled</td>
                  <td>Selects every enabled &lt;input&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>:first-child</em>
                  </td>
                  <td>p:first-child</td>
                  <td>Selects every &lt;p&gt; element that is the first child of its parent</td>
                </tr>
                <tr>
                  <td>
                    <em>::first-letter</em>
                  </td>
                  <td>p::first-letter</td>
                  <td>Selects the first letter of every &lt;p&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>::first-line</em>
                  </td>
                  <td>p::first-line</td>
                  <td>Selects the first line of every &lt;p&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>:first-of-type</em>
                  </td>
                  <td>p:first-of-type</td>
                  <td>
                    Selects every &lt;p&gt; element that is the first &lt;p&gt; element of its
                    parent
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:focus</em>
                  </td>
                  <td>input:focus</td>
                  <td>Selects the input element which has focus</td>
                </tr>
                <tr>
                  <td>
                    <em>:fullscreen</em>
                  </td>
                  <td>:fullscreen</td>
                  <td>Selects the element that is in full-screen mode</td>
                </tr>
                <tr>
                  <td>
                    <em>:hover</em>
                  </td>
                  <td>a:hover</td>
                  <td>Selects links on mouse over</td>
                </tr>
                <tr>
                  <td>
                    <em>:in-range</em>
                  </td>
                  <td>input:in-range</td>
                  <td>Selects input elements with a value within a specified range</td>
                </tr>
                <tr>
                  <td>
                    <em>:indeterminate</em>
                  </td>
                  <td>input:indeterminate</td>
                  <td>Selects input elements that are in an indeterminate state</td>
                </tr>
                <tr>
                  <td>
                    <em>:invalid</em>
                  </td>
                  <td>input:invalid</td>
                  <td>Selects all input elements with an invalid value</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      :lang(<em>language</em>)
                    </em>
                  </td>
                  <td>p:lang(it)</td>
                  <td>
                    Selects every &lt;p&gt; element with a lang attribute equal to "it" (Italian)
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:last-child</em>
                  </td>
                  <td>p:last-child</td>
                  <td>Selects every &lt;p&gt; element that is the last child of its parent</td>
                </tr>
                <tr>
                  <td>
                    <em>:last-of-type</em>
                  </td>
                  <td>p:last-of-type</td>
                  <td>
                    Selects every &lt;p&gt; element that is the last &lt;p&gt; element of its parent
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:link</em>
                  </td>
                  <td>a:link</td>
                  <td>Selects all unvisited links</td>
                </tr>
                <tr>
                  <td>
                    <em>::marker</em>
                  </td>
                  <td>::marker</td>
                  <td>Selects the markers of list items</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      :not(<em>selector</em>)
                    </em>
                  </td>
                  <td>:not(p)</td>
                  <td>Selects every element that is not a &lt;p&gt; element</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      :nth-child(<em>n</em>)
                    </em>
                  </td>
                  <td>p:nth-child(2)</td>
                  <td>Selects every &lt;p&gt; element that is the second child of its parent</td>
                </tr>
                <tr>
                  <td>
                    <em>
                      :nth-last-child(<em>n</em>)
                    </em>
                  </td>
                  <td>p:nth-last-child(2)</td>
                  <td>
                    Selects every &lt;p&gt; element that is the second child of its parent, counting
                    from the last child
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>
                      :nth-last-of-type(<em>n</em>)
                    </em>
                  </td>
                  <td>p:nth-last-of-type(2)</td>
                  <td>
                    Selects every &lt;p&gt; element that is the second &lt;p&gt; element of its
                    parent, counting from the last child
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>
                      :nth-of-type(<em>n</em>)
                    </em>
                  </td>
                  <td>p:nth-of-type(2)</td>
                  <td>
                    Selects every &lt;p&gt; element that is the second &lt;p&gt; element of its
                    parent
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:only-of-type</em>
                  </td>
                  <td>p:only-of-type</td>
                  <td>
                    Selects every &lt;p&gt; element that is the only &lt;p&gt; element of its parent
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:only-child</em>
                  </td>
                  <td>p:only-child</td>
                  <td>Selects every &lt;p&gt; element that is the only child of its parent</td>
                </tr>
                <tr>
                  <td>
                    <em>:optional</em>
                  </td>
                  <td>input:optional</td>
                  <td>Selects input elements with no "required" attribute</td>
                </tr>
                <tr>
                  <td>
                    <em>:out-of-range</em>
                  </td>
                  <td>input:out-of-range</td>
                  <td>Selects input elements with a value outside a specified range</td>
                </tr>
                <tr>
                  <td>
                    <em>::placeholder</em>
                  </td>
                  <td>input::placeholder</td>
                  <td>Selects input elements with the "placeholder" attribute specified</td>
                </tr>
                <tr>
                  <td>
                    <em>:read-only</em>
                  </td>
                  <td>input:read-only</td>
                  <td>Selects input elements with the "readonly" attribute specified</td>
                </tr>
                <tr>
                  <td>
                    <em>:read-write</em>
                  </td>
                  <td>input:read-write</td>
                  <td>Selects input elements with the "readonly" attribute NOT specified</td>
                </tr>
                <tr>
                  <td>
                    <em>:required</em>
                  </td>
                  <td>input:required</td>
                  <td>Selects input elements with the "required" attribute specified</td>
                </tr>
                <tr>
                  <td>
                    <em>:root</em>
                  </td>
                  <td>:root</td>
                  <td>Selects the document's root element</td>
                </tr>
                <tr>
                  <td>
                    <em>::selection</em>
                  </td>
                  <td>::selection</td>
                  <td>Selects the portion of an element that is selected by a user</td>
                </tr>
                <tr>
                  <td>
                    <em>:target</em>
                  </td>
                  <td>#news:target </td>
                  <td>
                    Selects the current active #news element (clicked on a URL containing that
                    anchor name)
                  </td>
                </tr>
                <tr>
                  <td>
                    <em>:valid</em>
                  </td>
                  <td>input:valid</td>
                  <td>Selects all input elements with a valid value</td>
                </tr>
                <tr>
                  <td>
                    <em>:visited</em>
                  </td>
                  <td>a:visited</td>
                  <td>Selects all visited links</td>
                </tr>
              </tbody>
            </table>
          </details>
          <table className="mt-20">
            <tbody>
              <tr>
                <th>Selector</th>
                <th>Specificity Value</th>
                <th>Calculation</th>
              </tr>
              <tr>
                <td>p</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>p.test</td>
                <td>11</td>
                <td>1 + 10</td>
              </tr>
              <tr>
                <td>p#demo</td>
                <td>101</td>
                <td>1 + 100</td>
              </tr>
              <tr>
                <td>&lt;p style="color: pink;"&gt;</td>
                <td>1000</td>
                <td>1000</td>
              </tr>
              <tr>
                <td>#demo</td>
                <td>100</td>
                <td>100</td>
              </tr>
              <tr>
                <td>.test</td>
                <td>10</td>
                <td>10</td>
              </tr>
              <tr>
                <td>p.test1.test2</td>
                <td>21</td>
                <td>1 + 10 + 10</td>
              </tr>
              <tr>
                <td>#navbar p#demo</td>
                <td>201</td>
                <td>100 + 1 + 100</td>
              </tr>
              <tr>
                <td>*</td>
                <td>0</td>
                <td>0 (the universal selector is ignored)</td>
              </tr>
            </tbody>
          </table>
          <p>
            <mark>Inline styles</mark> added to an element (e.g.,{" "}
            <code>style="font-weight: bold;"</code>) always overwrite any normal styles in author
            stylesheets, and therefore, can be thought of as having the highest specificity. Think
            of inline styles as having a specificity weight of 1-0-0-0. The only way to override
            inline styles is by using !important.
          </p>
          <p>
            <mark>!important</mark> reverses the cascade order of stylesheets. If declarations from
            the same origin and cascade layer conflict and one property value has the{" "}
            <code>!important</code> flag set, the important declaration is applied no matter the
            specificity. When conflicting declarations from the same origin and cascade layer with
            the <code>!important</code> flag are applied to the same element, the declaration with a
            greater specificity is applied. Using <code>!important</code> to override specificity is
            considered a bad practice.
          </p>
        </fieldset>
      </>
    ),
  },
  {
    id: "5",
    title: "Temporal Dead Zone",
    content: (
      <fieldset>
        <legend>
          <h4>Temporal Dead Zone</h4>
        </legend>
        <p>
          <mark>
            <b>Temporal Dead Zone</b>
          </mark>{" "}
          - the state where variables are un-reachable. They are in scope, but they aren't declared.
        </p>
        <p>
          <em>TDZ exists because of hoisting.</em> The only difference between <code>const</code>{" "}
          and <code>let</code> is that when they are hoisted, their values don't get defaulted to{" "}
          <code>undefined</code>.
        </p>
        <p>TDZ exists to helps us catch errors.</p>
        <p>
          Always make sure you define your <code>let</code>s and <code>const</code>s at the top of
          your scope.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >
          {`console.log(varNumber); // undefined 
console.log(letNumber); // ReferenceError letNumber is not defined

var varNumber = 1;
let letNumber = 1;


// Both the below variables will be hoisted to the top of their scope!
console.log(typeof nonsenseThatDoesntExist); // undefined
console.log(typeof name); // Throws an error, cannot access 'name' before initialization

let name = "Kealan";`}
        </SyntaxHighlighter>
        <p>
          The <code>let</code> and <code>const</code> variables exist in the TDZ from the start of
          their enclosing scope until they are declared.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >
          {`{
  // ☠️ temporal dead zone! ☠️
  // ☠️ temporal dead zone! ☠️
  // ☠️ temporal dead zone! ☠️
  // ☠️ temporal dead zone! ☠️
  let age = 25; // Whew, we got there! No more TDZ
  console.log(age);
}`}
        </SyntaxHighlighter>
        <p>
          You can see above that if I accessed the age variable earlier than its declaration, it
          would throw a ReferenceError. Because of the TDZ.
        </p>
        <p>
          But <code>var</code> won't do that, it's just default initialized to{" "}
          <code>undefined</code> unlike the other declaration.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >
          {`function scopeExample() {
  // 1 - Declaring a variable - we reserve the name in memory at the current scope
  let age;
  // 2 - Initialising a variable - setting the value of the variable
  age = 20; 
  // 3 - Or you could always do both on one line. 
  let hands = 2; 
}`}
        </SyntaxHighlighter>
        <p>
          The <code>hands</code> and <code>age</code> variables both enter the TDZ. The TDZ for{" "}
          <code>hands</code> ends when it gets declared, the same line it gets set to 2. The TDZ for{" "}
          <code>age</code> ends when it gets declared, and the name reserved in memory (in step 2).
        </p>
      </fieldset>
    ),
  },
  {
    id: "6",
    title: "Lexical Environment",
    content: (
      <fieldset>
        <legend>
          <h4>Lexical Environment</h4>
        </legend>
        <p>
          A{" "}
          <mark>
            <b>lexical environment</b>
          </mark>{" "}
          consists of two main components:
        </p>
        <ul>
          <li>
            <em>environment record</em>
          </li>
          <li>
            <em>reference to the outer (parent) lexical environment</em>
          </li>
        </ul>
        <p>
          Call to a function creates a new execution context. If it has a nested function call, a
          new context is created and is put on top of its parent context. When the function finishes
          executing, it gets popped out of the stack and flow returns back to the context below in
          the stack.
        </p>
        <p>There’s one Global context where our code/script is executed.</p>
        <p>
          <em>
            Execution context stack follows <b>LIFO</b> data structure.
          </em>
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >
          {`var x = 10;

function foo() {
  var y = 20;
  console.log(x+y); // 30
}

// Environment technically consist of two main components: 
// environmentRecord, and a reference to the outer environment

// Environment of the global context
globalEnvironment = {
  environmentRecord: {
    // built-ins
    // our bindings:
    x: 10
  },
  outer: null // no parent environment
};

// Environment of the "foo" function
fooEnvironment = {
  environmentRecord: {
    y: 20
  },
  outer: globalEnvironment
};`}
        </SyntaxHighlighter>
        <p>
          <b>VariableEnvironment</b> and <b>LexicalEnvironment</b> both <em>statically</em> captured
          the outer binding for inner functions created in the context. All functions at the
          creation stage{" "}
          <mark>
            <em>statically</em>
          </mark>{" "}
          (lexically) capture the outer binding of their parent environment. This allows the nested
          function to access the outer binding even if the parent context is wiped out from the
          execution stack. This mechanism is the foundation of closures in JavaScript.
        </p>
      </fieldset>
    ),
  },
  {
    id: "7",
    title: "Web Storages",
    content: (
      <fieldset>
        <legend>
          <h4>Web Storages</h4>
        </legend>
        <ul>
          <li>
            {" "}
            <mark>
              <b>localStorage</b>
            </mark>{" "}
            - stores data with <em>no expiration date</em>.
            <ul>
              <li>
                Stores data with no expiration date, and gets cleared only through JavaScript, or
                clearing the Browser cache / Locally Stored Data.
              </li>
              <li>Storage limit is the maximum amongst the two.</li>
            </ul>
          </li>
          <li>
            <mark>
              <b>sessionStorage</b>
            </mark>{" "}
            - stores data <em>for one session</em> (data is lost when the browser tab is closed).
            <ul>
              <li>Data is never transferred to the server.</li>
              <li>Storage limit is larger than a cookie (at most 5MB).</li>
            </ul>
          </li>
        </ul>

        <p>
          Both are used for storing the data on the client-side. the data is never transferred to
          the server while making a network request.
        </p>
        <p>
          Both are stored on the window object of the browser — <code>window.localStorage</code> or{" "}
          <code>localStorage</code> and <code>window.sessionStorage</code> or{" "}
          <code>sessionStorage</code>.
        </p>
        <p>
          It’s recommended to use the browser storage when there is no sensitive data and payload
          size up to 5MB.
        </p>
      </fieldset>
    ),
  },
  {
    id: "8",
    title: "Catch/Finally",
    content: (
      <fieldset>
        <legend>
          <h4>Catch/Finally</h4>
        </legend>
        <p>
          The{" "}
          <mark>
            <b>try/catch/finally</b>
          </mark>{" "}
          statements combo <em>handles errors without stopping JavaScript.</em>
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >
          {`try {
  // code may cause exceptions
} catch (error) {
  // code to handle exceptions
} finally {
  // code to execute whether exceptions occur or not
}`}
        </SyntaxHighlighter>
        <ul>
          <li>
            Use the finally clause in the <code>try/catch/finally</code> statement to execute a
            block whether exceptions occur or not.
          </li>
          <li>
            The <code>try/catch/finally</code> statement ignores the return statement in the{" "}
            <code>try</code> and <code>catch</code> blocks because the{" "}
            <em>
              <code>finally</code> block always executes
            </em>
            .
          </li>
        </ul>
      </fieldset>
    ),
  },
  {
    id: "9",
    title: "Inheritance",
    content: (
      <fieldset>
        <legend>
          <h4>Inheritance</h4>
        </legend>
        <p>
          <mark>
            <b>Inheritance</b>
          </mark>{" "}
          is a{" "}
          <em>
            {" "}
            mechanism that permits an object to inherit all of the methods and properties of its
            parent
          </em>{" "}
          or base object. It is also considered a crucial component of OOP.
        </p>
        <p>Inheritance types:</p>
        <ul>
          <li>
            <p>
              <mark>Prototypal Inheritance</mark> - enables to{" "}
              <em>access properties and methods of a parent object</em>. Newly created object is
              permitted to inherit the properties and method of an existing object.
            </p>
            <p>
              Typically, <code>Object.getPrototypeOf()</code> and{" "}
              <code>Object.setPrototypeOf()</code> can be used to get and set an object’s Prototype;{" "}
              <code>__proto__</code> accessor property can be used for the similar purpose.
            </p>
            <SyntaxHighlighter
              language="javascript"
              style={tomorrowNight}
              showLineNumbers
              lineNumberStyle={{ minWidth: "15px" }}
              wrapLongLines
            >
              {`ChildObject.__proto__ = ParentObject 
// “ChildObject” represents the newly created object which inherits the properties and methods of “ParentObject”.`}
            </SyntaxHighlighter>
          </li>
          <li>
            <p>
              <mark>Pseudoclassical Inheritance</mark>. The idea of this type is to create an
              <em>
                {" "}
                “inherited” function that assists in associating the child class to the parent class
              </em>
              .
            </p>
            <p>Pseudoclassical Inheritance utilizes:</p>
            <ul>
              <li>
                A <code>constructor()</code> function
              </li>
              <li>
                <code>new</code> operator for creating instances
              </li>
              <li>
                A <code>prototype</code> property that establishes the chain of inheritance and is
                assigned to the constructor function so that all instances inherit the specified
                property.
              </li>
            </ul>
            <p>Expample:</p>
            <SyntaxHighlighter
              language="javascript"
              style={tomorrowNight}
              showLineNumbers
              lineNumberStyle={{ minWidth: "15px" }}
              wrapLongLines
            >
              {`function Bike() {
  this.name = 'Bike';
};

Bike.prototype.info = function() {
  console.log('This is a ' + this.name );
};

function Venom() {
  Bike.call(this); // “Bike.call()” method for invoking the Bike constructor()
  this.name = 'Venom';
};

Venom.prototype = Object.create(Bike.prototype);
Venom.prototype.constructor = Bike;

// creating the two instances, “venom” and “bike“
var venom = new Venom();
var bike = new Bike();

// after doing so, the “info()” function is invoked for both instances:
venom.info() // This is a Venom;
bike.info() // This is a Bike;`}
            </SyntaxHighlighter>
          </li>
          <li>
            <p>
              <mark>Functional Inheritance</mark> - inheriting properties by{" "}
              <em>applying an augmenting function</em> (function having generic functionality) to an
              object instance
            </p>
            <SyntaxHighlighter
              language="javascript"
              style={tomorrowNight}
              showLineNumbers
              lineNumberStyle={{ minWidth: "15px" }}
              wrapLongLines
            >
              {`function Bike(data) { // a “Bike” object having a inner object named “x”
  var x = {};
  x.name = data.name;
  return x;
};

function Venom(data) {
  var x = Bike(data);

  x.info = function() {
    return "This is a " + x.name + " Bike";
  };

  return x;
};

var venom = Venom({ name: "Venom" });
console.log(venom.info()); // This is a Venom Bike`}
            </SyntaxHighlighter>
          </li>
        </ul>
      </fieldset>
    ),
  },
  {
    id: "10",
    title: "Virtual DOM",
    content: (
      <fieldset>
        <legend>
          <h4>Virtual DOM</h4>
        </legend>
        <p>
          DOM operations are expensive, and updating the whole DOM on every prop/state change is
          very inefficient. Here’s how the virtual DOM deals with this inefficiency:
        </p>
        <ul>
          <li>A component props/state changes</li>
          <li>React triggers a rerender</li>
          <li>
            React compares the virtual DOM (virtual DOM before the update) with the updated virtual
            DOM (virtual DOM after update)
          </li>
          <li>
            React determines the best possible way to reflect the changes in the UI with minimal
            operations on the real DOM.
          </li>
        </ul>
        <p>
          <mark>
            <b>Virtual DOM</b>
          </mark>{" "}
          - programming concept where an ideal, or “virtual”, representation of a UI is kept in
          memory and synced with the “real” DOM by a library such as ReactDOM. This process is
          called{" "}
          <em>
            <b>reconciliation</b>
          </em>
          .
        </p>
        <p>
          <b>VDOM</b> is kind of the blueprint of a machine, changes made to the blueprint doesn't
          reflects on the machine itself.
        </p>
        <p>
          <mark>
            <b>Reconciliation</b>
          </mark>{" "}
          - the process of keeping virtual DOM in sync with the real DOM.
        </p>
        <p>
          <em>
            The comparison between the virtual DOMs is called{" "}
            <mark>
              <b>diffing</b>
            </mark>
            .{" "}
          </em>
          It compares the two trees by comparing their root nodes first.
        </p>
        <ul>
          <li>
            <p>
              <em>Different root nodes</em>
            </p>
            <p>
              Comparing the two trees above will lead to a full rebuild because the root elements{" "}
              <code>{`<div>`}</code> and <code>{`<section>`}</code> are different. Any components
              below root will also be rebuilt.
            </p>
            <SyntaxHighlighter
              language="react"
              style={tomorrowNight}
              showLineNumbers
              lineNumberStyle={{ minWidth: "15px" }}
              wrapLongLines
            >{`<div>
  <p>Hello</p>
</div>

<section>
  <p>Hello</p>
</section>`}</SyntaxHighlighter>
          </li>
          <li>
            <p>
              <em>Same root nodes</em>
            </p>
            <p>
              When DOM elements of the same type are compared, React compares the attributes of
              both, keeps the same underlying DOM node, and updates the changed attributes. React
              modifies the className on the underlying DOM node.
            </p>
            <SyntaxHighlighter
              language="react"
              style={tomorrowNight}
              showLineNumbers
              lineNumberStyle={{ minWidth: "15px" }}
              wrapLongLines
            >{`<div className="foo" />
<div className="foo bar" />`}</SyntaxHighlighter>
          </li>
        </ul>
        <p>
          When diffing children of a DOM node, React compares children of both lists and generates a
          mutation whenever there’s a difference. To avoid of repaint all the list items we can give
          a{" "}
          <mark>
            {" "}
            <em>key prop</em>
          </mark>{" "}
          a value that uniquely identifies a list item among its siblings.
        </p>
        <p>
          <mark>
            {" "}
            <b>Key prop</b>{" "}
          </mark>{" "}
          lets React identify each element in a list. It is used to{" "}
          <em>keep track of items that are changed, added, or removed</em> . Key should be unique
          among its siblings not globally.
        </p>
      </fieldset>
    ),
  },
  {
    id: "11",
    title: "React.createElement",
    content: (
      <fieldset>
        <legend>
          <h4>React.createElement</h4>
        </legend>
        <p>
          Each JSX element is just syntactic sugar for calling{" "}
          <code>React.createElement(component, props, ...children)</code> . So, anything you can do
          with JSX can also be done with just plain JavaScript.
        </p>
        <p>
          <em>JSX:</em>
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >
          {`function Button(props) {
  return <button onClick={props.handleClick}>{props.name}</button>
}

class Counter extends React.Component {

  state = {
    num: 0
  }

  handleIncrement = () => {
    this.setState({
      num: this.state.num + 1
    })
  }

  handleDecrement = () => {
    this.setState({
      num: this.state.num - 1
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <Button name="Increment" handleClick={this.handleIncrement} />
        <Button name="Decrement" handleClick={this.handleDecrement} />
      </div>

    )
  }
}


ReactDOM.render(<Counter />, document.querySelector('#root'))`}
        </SyntaxHighlighter>
        <p>
          <em>React.createElement:</em>
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >
          {`const  el =  React.createElement;

function Button(props){
  return el('button',{onClick:props.handleClick},props.name);
}

class Counter extends React.Component{

  state= {
       num: 0
  }

  handleIncrement = () =>{
    this.setState({
      num: this.state.num + 1
    })
  }

   handleDecrement = () =>{
    this.setState({
      num: this.state.num - 1
    })
  }

  render(){
    return el('div',null,
                  el(Button,{handleClick:this.handleIncrement,name:'Increment'},null),
                  el(Button,{handleClick:this.handleDecrement,name:'Decrement'},null),
                  el('p',null,this.state.num)
    )
  }
}

ReactDOM.render(el(Counter,null,null),document.querySelector('#root'));`}
        </SyntaxHighlighter>
      </fieldset>
    ),
  },
  {
    id: "12",
    title: "Hooks",
    content: (
      <fieldset>
        <legend>
          <h4>Hooks</h4>
        </legend>
        <p>
          <b>Hooks</b> let you use state and other React features without writing a class.
        </p>
        <p>
          <b>Rules of hooks:</b>
        </p>
        <ul>
          <li>
            <em>
              <mark>Only Call Hooks at the Top Level.</mark>
            </em>{" "}
            Don’t call Hooks inside loops, conditions, or nested functions. By following this rule,
            you ensure that Hooks are called in the same order each time a component renders.
          </li>
          <li>
            <em>
              <mark>Only Call Hooks from React Functions.</mark>
            </em>{" "}
            Call Hooks from React function components or from custom Hooks. By following this rule,
            you ensure that all stateful logic in a component is clearly visible from its source
            code.
          </li>
        </ul>
      </fieldset>
    ),
  },
  {
    id: "13",
    title: "Lifting State",
    content: (
      <fieldset>
        <legend>
          <h4>Lifting State</h4>
        </legend>
        <p>
          <mark>
            <b>Lifting state up</b>
          </mark>{" "}
          is a common pattern that helps to avoid more complex (and often unnecessary) patterns for
          managing state.
        </p>
        <p>
          Every component in React has its own state. Because of this sometimes data can be
          redundant and inconsistent. So, by Lifting up the state we make the state of the parent
          component as a single source of truth and pass the data of the parent in its children.
        </p>
        <p>
          For example, if we have 3 components in our App, where A is the parent of B and C. There
          is some Data only in component B but, component C also wants that data.
        </p>
        <p>
          Component <code>A</code>:
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >{`import React,{ Component }  from 'react';
import B from './B'
import C from './C'
   
class A extends Component {
  
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {text: ''};
  }
  
  handleTextChange(newText) {
    this.setState({text: newText});
  }
   
  render() {
    return (
        <React.Fragment>
          <B text={this.state.text} 
             handleTextChange={this.handleTextChange}/>
          <C text={this.state.text} />
        </React.Fragment>
    );
  }
}
  
export default A;`}</SyntaxHighlighter>
        <p>
          Component <code>B</code>:
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >{`import React,{ Component } from 'react';

class B extends Component {

  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e){
    this.props.handleTextChange(e.target.value);
  }

  render() {
    return (
      <input value={this.props.text}
        onChange={this.handleTextChange} />
    );
  }
}
	
export default B;`}</SyntaxHighlighter>
        <p>
          Component <code>C</code>:
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >{`import React,{ Component } from 'react';

class C extends Component {

  render() {
    return (
      <h3>Output: {this.props.text}</h3>
    );
  }
}
	
export default C;`}</SyntaxHighlighter>
        <p>
          Thus, component <code>C</code> can access text in component <code>B</code> through
          component <code>A</code>.
        </p>
      </fieldset>
    ),
  },
  {
    id: "14",
    title: "React.Fragment",
    content: (
      <fieldset>
        <legend>
          <h4>React.Fragment</h4>
        </legend>
        <p>
          <mark>
            <b>Fragments</b>
          </mark>{" "}
          let you group a list of children without adding extra nodes to the DOM.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrowNight}
          showLineNumbers
          lineNumberStyle={{ minWidth: "15px" }}
          wrapLongLines
        >{`render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}

// Short syntax:
render() {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
}`}</SyntaxHighlighter>
        <p>
          The difference between standart and short syntax is that{" "}
          <em>short syntax doesn’t support keys or attributes.</em>
        </p>
        <p>
          <code>key</code> is the only attribute that can be passed to Fragment for now.
        </p>
      </fieldset>
    ),
  },
];
