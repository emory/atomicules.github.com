---
layout: page
type: text
title: Looping Through Figures, Sweave vs Tikz (pgfSweave)
categories: 
- code
---
Almost as soon as you start using R you hear about [Sweave](http://www.statistik.lmu.de/~leisch/Sweave/) (probably because it is included with the base install of R) which allows you to embed R code within LaTeX documents. However, I placed learning it on the back-burner for about a year so I could just spend time getting my head around R (although how I've managed to avoid LaTeX until now, considering my background and the amount of technical reports I've written over the years, is another matter).

Then, as soon as you start using Sweave you come across the issue of plot fonts and sizes not matching the main report (personally I can live with the different font style, but the different sizes is annoying). And so that's when you hear about [pgfSweave](http://crantastic.org/packages/pgfSweave).

However, I was using Lattice graphics built-in capability to produce [multiple pages of plots](http://stat.ethz.ch/R-manual/R-devel/library/lattice/html/xyplot.html) (see 'layout'):

> The number of pages is by default set to as many as is required to plot all the panels, and so rarely needs to be specified. However, in certain situations the default calculation may be incorrect, and in that case the number of pages needs to be specified explicitly.

In Sweave, the way you would [use one code chunk to produce multiple figures](http://www.statistik.lmu.de/~leisch/Sweave/FAQ.html#x1-11000A.9) is to use a `tex` chunk rather than a `fig`:

<script src="https://gist.github.com/1380278.js?file=traditional_sweave_loop.Rnw"></script>

I still haven't fully got my head round pgfSweave and [Tikz](http://cran.r-project.org/web/packages/tikzDevice/), but for individual plots you indicate the use of Tikz within the figure:

<script src="https://gist.github.com/1380278.js?file=reference_for_pgfsweave-tikz_option.Rnw"></script>

But I wanted to be able to produce all plots via a loop as per Sweave, rather than have to manually set up enough `fig` chunks so I came up with the following:

<script src="https://gist.github.com/1380278.js?file=tikz_loop.Rnw"></script>

All of this looks and seems amazingly obvious as I write it up now, but it wasn't at the time. Especially because I came across this weird bug (which, thinking about it now, might not be a bug, rather a nuance of the [data.table](http://crantastic.org/packages/data-table) package - I need to investigate further):

works:

<script src="https://gist.github.com/1380293.js?file=good.R"></script>

doesn't work:

<script src="https://gist.github.com/1380293.js?file=bad.R"></script>

Since this just uses Tikz within a `tex` chunk, in theory pgfSweave isn't actually required to process this and just  plain Sweave would do, in practice however, since pgfSweave can externalise the graphics by default, it will avoid text memory capacity issues with a large number of loops, where Sweave will run into them. 

When I got the Tikz solution working, I actually decided to go back to the plain Sweave way of doing things as for me it was much faster (producing Lattice xyplots, especially with lots of data points, is slow via Tikz) and using the `\includegraphics` approach, the pngs scale better and you don't run into overfull `\hbox` issues. You just need to tweak the text sizes for the plots to look ok.

Since this, I've also come across a post which uses a [latex loop](http://www.mail-archive.com/r-help@r-project.org/msg105487.html) (which I thought must be possible, but wasn't clever enough to work out), but then also goes on to mention [Brew](http://cran.r-project.org/web/packages/brew/index.html) which looks interesting... and easier.
