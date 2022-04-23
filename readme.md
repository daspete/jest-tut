# Testing

Wenn wir coden, machen wir immer wieder kleine Tests, indem wir console.logs einbauen, oder vielleicht sogar mit Breakpoints schauen, ob eine Methode die richtige Funktion ausführt. 
Das machen wir aber meistens nur einmal, und das auch nur mit Werten, die die Methode durchlaufen lassen. Das heißt, wir testen selten die Fehlerfälle, und noch seltener Edge Cases.
Oder wenn es sich um ein größeres Projekt handelt, und man mit der Zeit die Grundfunktionen ändern und erweitern muss, stellt man noch weniger sicher, dass die Funktionen auch immer noch für die Szenarien vom Beginn des Projekts funktionieren.

Um sicherzugehen, dass eine Methode, oder auch eine Klasse immer richtig arbeitet, gibt es sogenannte Unit Tests.

Diese Unit Tests lassen sich mit Test Suites ausführen. In unserem Fall arbeiten wir mit JEST. Es gibt noch viele andere Testsuites, wie Mocha, YUI Test, Unit.js, etc.
Oder man könnte auch eine eigene Testing Struktur bauen, was jedoch alles unnötig kompliziert macht.

Es gibt mehrere Möglichkeiten, Testing in den Workflow einzubauen. Entweder schreibt man zuerst die Funktion oder die Klasse, und baut danach die Tests, um zu sehen, ob der gebaute Code auch wirklich funktioniert. 
Oder aber, vielleicht der bessere Weg: Man bekommt eine Anforderung, baut zuerst alle Tests, die diese Anforderung abdecken, natürlich failen dann alle diese Tests, und baut dann erst den Code, um alle Tests grün zu bekommen.
Das zwingt uns dazu, die Fumktion, oder die Klasse von Anfang bis Ende durchzudenken, was vielleicht schon ein Refactoring bewirkt, bevor man überhaupt begonnen hat, die Funktion zu bauen.

# Jest 

Jeder Test in Jest startet mit einer test() Funktion, die sich einen String, die Beschreibung des aktuellen Testcases, und eine Funktion erwartet.

Innerhalb dieser Funktion, expecten wir dann gewisse States.

Also wir matchen das Ergebnis einer Funktion mit unserer Erwartung.

Alle verfügbaren "Matcher" seht ihr hier: https://jestjs.io/docs/using-matchers bzw. hier die vollständige Liste: https://jestjs.io/docs/expect

## Installation

um Jest zu nutzen, müssen wir nur das package installieren.

```
yarn add jest
```

oder 

```
npm install --save-dev jest
```

und danach muss man noch in der package.json Datei das Testscript anlegen, das Jest startet:

```
"scripts": {
    "test": "jest"
}
```

## Erster Test

Zuerst legen wir ein neues Testfile an. Per default schaut Jest mit folgender Regex nach testbaren Dateien:

```
**/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x)
```

Das heißt, man kann hier eigene __tests__ folder anlegen, in denen dann js(x) oder ts(x) Files liegen, oder aber man erstellt Files mit der Endung: .test.js(x), .test.ts(x) oder .spec.js(x), .spec.ts(x)

Unser erster Test wird relativ einfach. 

Wir haben folgende Anforderung an eine neue Funktion:

Wir benötigen eine Funktion, die ein User Objekt bekommt, aus diesem Userobjekt soll der Vorname und der Nachname, und auch alle akademischen Grade als String zurückgegeben werden.
Also zum Beispiel:

```js
const user = {
    firstname: 'Homer',
    lastname: 'Simpson',
    degrees: [
        'Dr.',
        'Phil.'
    ]
}

const fullName = getFullName(user)

console.log(`Hello ${ fullName }`) // should print: Hello Dr. Phil. Homer Simpson
```

Also benötigen wir ein neues JS File mit dem Namen getFullName.js und ein neues Testfile mit dem Namen getFullName.test.js

getFullName.js bekommt erst einmal eine leere Funktion:

```js
const getFullName = (user) => {

}

module.exports = getFullName
```

Nun legen wir getFullName.test.js an, in diesem File importieren wir die Funktion, die wir testen wollen, und definieren unseren ersten Test:

```js
const getFullName = require('./getFullName');

test('should return the full name with all degrees of the user', () => {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        degrees: ['M.Sc.', 'PhD']
    }

    expect(getFullName(user)).toBe('M.Sc., PhD John Doe')
})
```

Also wir legen ein neues User Objekt an, und wollen, dass die Funktion getFullName einen String zurückliefert, der alle akademischen Grade, den Vornamen und den Nachnamen beinhaltet.

Wenn wir diesen Test nun durchlaufen lassen, mit ```yarn test``` oder ```npm run test```, bekommen wir einen failed Test zurück, da wir die Funktion ja noch gar nicht geschrieben haben.

```
$ jest
 FAIL  ./getFullName.test.js
  ✕ should return the full name with all degrees of the user (3 ms)

  ● should return the full name with all degrees of the user

    expect(received).toBe(expected) // Object.is equality

    Expected: "John Doe, M.Sc. and PhD"
    Received: undefined

       9 |     }
      10 |
    > 11 |     expect(getFullName(user)).toBe('John Doe, M.Sc. and PhD')
         |                               ^
      12 |
      13 | })

      at Object.<anonymous> (getFullName.test.js:11:31)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.211 s
Ran all test suites.
error Command failed with exit code 1.
```

Das können wir jetzt gleich mal machen. Also in der getFullName.js Datei geben wir nun den gewünschten String zurück:

```js 
const getFullName = (user) => {
    return `${ user.degrees.join(', ') } ${ user.firstName } ${ user.lastName }`
}

module.exports = getFullName
```

Lassen wir nun den Test durchlaufen, erhalten wir ein Passed, YEY :)

```
$ jest
 PASS  ./getFullName.test.js
  ✓ should return the full name with all degrees of the user (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.183 s, estimated 1 s
Ran all test suites.
Done in 0.70s.
```

Jetzt haben wir jedoch nur den Fall getestet, dass ein valides User Object verwendet wird. Um sinnvolle Tests zu machen, müssen wir auch Fälle abdecken, die beschreiben, was passieren soll, wenn ungültige Daten verarbeitet werden sollen.

Wenn wir nun das Testfile erweitern um diesen Test:

```js
test('should give an error, when no firstname or lastname is defined', () => {
    const user = {
        firstName: 'John',
        degrees: ['M.Sc.', 'PhD']
    }

    expect(() => getFullName(user)).toThrow('No lastname defined');
})
```

und lassen die Tests laufen, bekommen wir wieder einen failed Test, weil wir den Fehler noch nicht abfangen:

```
$ jest
 FAIL  ./getFullName.test.js
  ✓ should return the full name with all degrees of the user (2 ms)
  ✕ should give an error, when no firstname or lastname is defined (1 ms)

  ● should give an error, when no firstname or lastname is defined

    expect(received).toThrow(expected)

    Expected substring: "No lastname defined"

    Received function did not throw

      17 |     }
      18 |
    > 19 |     expect(() => getFullName(user)).toThrow('No lastname defined');
         |                                     ^
      20 | })

      at Object.<anonymous> (getFullName.test.js:19:37)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.163 s, estimated 1 s
Ran all test suites.
error Command failed with exit code 1.
```

also müssen wir unsere Funktion noch erweitern, dass auch die Fehlermeldungen geworfen werden, wenn die Daten nicht vorhanden sind.

```js
const getFullName = (user) => {
    if(!user.firstName) throw new Error('No firstname defined')
    if(!user.lastName) throw new Error('No lastname defined')
    
    return `${ user.degrees.join(', ') } ${ user.firstName } ${ user.lastName }`
}

module.exports = getFullName
```

lassen wir nun die Tests wieder laufen, ist wieder alles grün :)

```
$ jest
 PASS  ./getFullName.test.js
  ✓ should return the full name with all degrees of the user (1 ms)
  ✓ should give an error, when no firstname or lastname is defined (4 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.196 s, estimated 1 s
Ran all test suites.
Done in 0.70s.
```

Am Besten, ihr macht jetzt alle Schritte mal selbst, und schreibt einen zusätzlichen Test: Sobald keine Degrees im User Objekt vorhanden sind, soll der Space am Anfang entfernt werden, also der String soll dann sein: "John Doe" und nicht " John Doe"

