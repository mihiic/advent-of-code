## Advent of Code
Effort to learn something new each year while doing easy tasks.

#### 2023
Focus is on getting slightly more comfortable with using neovim.
Was initially interested in learning Go language, but focusing on both
Go and neovim was too much at one time, so decided to stick to Javascript.

#### Day 05
Brute forced attack. Maybe a challenge for some other time :)

#### Day 10
Solution is a bit too recursive, so it exceeds stack call size. Run using:
```
node --stack-size=16384 part-two.js
```

Solution is still very fast (much under 1 second) so I do not feel compelled
to optimize this recursion.
