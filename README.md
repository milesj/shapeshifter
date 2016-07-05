# Shapeshifter
[![Build Status](https://travis-ci.org/milesj/shapeshifter.svg?branch=master)](https://travis-ci.org/milesj/shapeshifter)

Shapeshifter is a command line tool for generating ES2015 compatible
files that export React prop types, Flow type aliases, or TypeScript
interfaces from JSON schema files. Schemas can represent database
tables, API endpoints, data structures, resources, internal shapes,
and more.

## Requirements

* ES2015
* Node 5+
* React 14+ / Flow 0.20+ / TypeScript 1.6+

## Installation

    npm install shapeshifter --save-dev

## Usage

Shapeshifter is provided as a binary which can be executed like so.

    shapeshifter [options] [input] > [output]

The binary input accepts either a single schema file or a directory of
schema files. If a directory is provided, they will be combined into 
a single output.

By default, the binary will send output to stdout, which can then be 
redirected to a destination of your choosing, otherwise the output
will be sent to the console.

### Options

`--help`, `-h` - Displays a help menu.

`--nullable`, `-n` - Marks all attributes as nullable by default.
Defaults to false. (Flow only)

`--required`, `-r` - Marks all attributes as required by default.
Defaults to false. (React and TypeScript only)

`--indent` - Defines the indentation characters to use in the
generated output. Defaults to 2 spaces.

`--format` - The format to output to. Accepts "react", "flow", or
"typescript". Defaults to "react".

`--suffix` - The suffix to append to all type definitions. Defaults
to "Suffix".
