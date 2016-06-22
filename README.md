# Shapeshifter

Shapeshifter is a command line tool for generating ES2015 compatiable
files that export React prop types, Flow aliases, and TypeScript
definitions based on JSON schema files. Schemas can represent database
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

The binary accepts either a single schema file or a directory of
schema files for the input. If a directory is provided, they will
be combined into a single output.

By default, the binary will send output to directly to stdout,
which can then be redirect to a destination of your choosing.
The output will be sent to the console if no redirect is defined.

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
