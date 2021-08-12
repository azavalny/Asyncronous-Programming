import asyncio

#Synchronous Programming: Performance based on clock speed of the processor
    #Speed at which code run = speed of your processor
def synchronousFunction():
    pass

#Asynchronous Programming: Allows us to run other operations while main code runs
    #Ex. you can execute other code while running a database querey

#Coroutine: Wrapped version of a function that allows it run Asynchronously
async def asyncFunction():
    """Returns a coroutine object that is executed through await"""
    #await secondAsync("Async Function is running!") #await executes the coroutine
    task = asyncio.create_task(secondAsync("Async Function is running!")) #task
    await task #wait until this task is finished, and once it's done, execute the next line, remove this to run all code immediately
    print("Done")

#Need to create an event-loop (handles running async code) before you run this. Must start one in whatever thread we're in

async def secondAsync(text):
    print(text)
    await asyncio.sleep(1)

#asyncio.run(asyncFunction())

#We want the print command to run while the secondAsync is sleeping

#Tasks: Start executing this ASAP, and allow other code to run while it's not running
#task = asyncio.create_task(secondAsync("Async Function is running!"))


###############################
#Example use in an application#
###############################
import numpy as np

async def fetch_some_data():
    print("Start Fetching")
    await asyncio.sleep(2)
    print('SELECT users.name FROM users WHERE age == 29 UNION SELECT users.email FROM users WHERE userName=="example" GROUPBY ASC')
    print('Done Fetching')
    return {'rows':1}
async def print_numbers():
    for i in range(10):
        print(i)
        await asyncio.sleep(np.log(0.25 +  i))

async def main():
    task1 = asyncio.create_task(fetch_some_data())
    task2 = asyncio.create_task(print_numbers())

    value = await task1 #Future = placeholder for when Coroutine returns a value
    print(value)
    await task2 #runs whenever task1 is delayed

asyncio.run(main())