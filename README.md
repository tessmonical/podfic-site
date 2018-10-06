# podfic-site
Work in progress; creating a site to share podfics

## Purpose

There is a niche of the internet out there dedicated to producing podfics- audiobooks of fanfiction. Previously these works were often hosted at [the audiofic archive](http://audiofic.jinjurly.com), but that site has not had a new work posted since Feb 2017. While text-based transformative works can be hosted on Archive Of Our Own or a number of other alternatives, podfics have no remaining centralized repositories.

This project aims to fix that, by providing a site to host podfics.

## MVP

The minimum viable project for this would be a site where a user can 
- upload audio files, an image for cover art, links to original text and writer, and a description of the podfic
- browse uploaded works by tags, reader, writer, and romantic pairings

In addition, there needs to be a moderation system in place to make sure that only podfics (not copyrighted material like music or professional audiobooks) gets uploaded, because I'm concerned about legal issues. For now, I'm trying to set it up so that each submission triggers an email to me, so that I can check files as they come in and manually approve them before they are shown to users. If this takes off I'll need something less crude.

## Features for later

- User accounts
- Social aspects (commenting, profiles)
- Donation button for hosting costs (if this takes off enough to need it)

## Tech stack
- I'm using React/Redux on the front end
- Back end is all AWS
  - Serverless framework using AWS lambda functions written in Node
  - Database is AWS DynamoDB
  - Audio files stored in S3
